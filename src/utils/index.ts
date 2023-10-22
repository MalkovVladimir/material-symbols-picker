import axios from 'axios';
import fs from 'fs';
import path from 'path';
import type { LoadParams, SymbolParams } from '../index.js';
import { getDownloadUrl } from '../constants/index.js';

const regexp = {
  wght: /[1-7]00/,
  grad: /(-25|200)/,
  opsz: /(20|24|40|48)/,
};

export const buildSymbolName = (name: string, params: SymbolParams) => {
  const { fill, wght, grad, opsz = 20 } = params;

  if (!name) throw new Error('Icon name empty');

  let iconParams = '';

  if (typeof wght === 'number' && wght !== 400) {
    if (wght.toString().match(regexp.wght)) {
      iconParams += `wght${wght}`;
    } else {
      throw new Error(`
        wght value incorrect: ${wght}. Should match regexp ${regexp.wght}
      `);
    }
  }

  if (typeof grad === 'number' && grad !== 0) {
    if (grad.toString().match(regexp.grad)) {
      iconParams += `grad${grad.toString().replace('-', 'N')}`;
    } else {
      throw new Error(
        `grad value incorrect: ${grad}. Should match regexp ${regexp.grad}`
      );
    }
  }

  if (typeof fill === 'number' && fill !== 0) {
    if (fill === 1) {
      iconParams += `fill${fill}`;
    } else {
      throw new Error(
        `wght value incorrect: ${fill}. Should be 1 or not presented`
      );
    }
  }

  if (!opsz.toString().match(regexp.opsz)) {
    throw new Error(
      `opsz value incorrect: ${opsz}. Should match regexp ${regexp.opsz}`
    );
  }

  return `${name}_${iconParams}_${opsz}px`.replace('__', '_');
};

export const downloadSymbolSVG = async (
  rawSymbolName: string,
  params: LoadParams
) => {
  const { type = 'outlined' } = params;

  let symbolName: string;
  let symbolNameWithParams: string;

  if (params.raw) {
    symbolName = rawSymbolName.split('_')[0];
    symbolNameWithParams = rawSymbolName;
  } else {
    symbolName = rawSymbolName;
    symbolNameWithParams = buildSymbolName(rawSymbolName, params);
  }

  const url = getDownloadUrl(symbolName, type, symbolNameWithParams);
  console.log('url', url);

  let svgData = '';

  try {
    const { data } = await axios.get(url);
    svgData = data;
  } catch (error) {
    console.error(
      `Download error! Image name ${symbolNameWithParams}`,
      error?.toString()
    );
    return;
  }

  const targetDirectory = params.dest
    ? path.join(params.dest, symbolName)
    : `./${symbolName}`;

  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
  }

  fs.writeFile(
    `${targetDirectory}/${symbolNameWithParams}.svg`,
    svgData,
    (error) => {
      if (error) {
        return console.error(symbolNameWithParams, error);
      }

      console.log(symbolNameWithParams);
    }
  );
};
