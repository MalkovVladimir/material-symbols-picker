import { buildSymbolName, downloadSymbolSVG } from './index';
import { LoadParams, SymbolParams } from '..';
import axios from 'axios';
import fs from 'fs';
import { getDownloadUrl } from '../constants';

describe('buildSymbolName should work', () => {
  const symbolName = 'menu';

  it('with empty parameters', () => {
    const params = {};
    const expectedSymbolName = 'menu_20px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });

  it('with default parameters', () => {
    const params: SymbolParams = {
      wght: 400,
      grad: 0,
      fill: 0,
      opsz: 20,
    };
    const expectedSymbolName = 'menu_20px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });

  it('with only fill setted', () => {
    const params: SymbolParams = {
      fill: 1,
    };
    const expectedSymbolName = 'menu_fill1_20px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });

  it('with only wght setted', () => {
    const params: SymbolParams = {
      wght: 600,
    };
    const expectedSymbolName = 'menu_wght600_20px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });

  it('with only grad setted', () => {
    const params: SymbolParams = {
      grad: -25,
    };
    const expectedSymbolName = 'menu_gradN25_20px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });

  it('with only opsz setted', () => {
    const params: SymbolParams = {
      opsz: 40,
    };
    const expectedSymbolName = 'menu_40px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });

  it('with all parameters setted', () => {
    const params: SymbolParams = {
      wght: 200,
      grad: 200,
      fill: 1,
      opsz: 48,
    };
    const expectedSymbolName = 'menu_wght200grad200fill1_48px';
    const builtSymbolName = buildSymbolName(symbolName, params);
    expect(builtSymbolName).toEqual(expectedSymbolName);
  });
});

jest.mock('axios');
jest.mock('fs');

describe('downloadSymbolSVG', () => {
  const symbolName = 'menu';
  const params: LoadParams = {
    dest: 'dist/symbols',
    wght: 200,
    grad: 200,
    fill: 1,
    opsz: 48,
    type: 'sharp',
  };
  const expectedSymbolName = 'menu_wght200grad200fill1_48px';
  const response = { data: '<svg>...</svg>' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should download and save the symbol SVG', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(
      response
    );

    (
      fs.mkdirSync as jest.MockedFunction<typeof fs.mkdirSync>
    ).mockImplementationOnce(() => '');
    (
      fs.writeFile as jest.MockedFunction<typeof fs.writeFile>
    ).mockImplementationOnce(() => {});

    await downloadSymbolSVG(symbolName, params);

    expect(axios.get).toHaveBeenCalledWith(
      getDownloadUrl(symbolName, params.type, expectedSymbolName)
    );

    const targetDirectory = `${params.dest}/${symbolName}`;
    expect(fs.mkdirSync).toHaveBeenCalledWith(targetDirectory);

    expect(fs.writeFile).toHaveBeenCalledWith(
      `${targetDirectory}/${expectedSymbolName}.svg`,
      response.data,
      expect.any(Function)
    );
  });
});
