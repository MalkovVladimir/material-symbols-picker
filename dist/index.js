#!/usr/bin/env node
import args from 'args';
import path from 'path';
import { downloadSymbolSVG } from './utils/index.js';
import { argsOptions } from './constants/index.js';
import { createRequire } from 'node:module';
function main() {
    const flags = args.options(argsOptions).parse(process.argv);
    let symbolList;
    if (flags.path) {
        const require = createRequire(import.meta.url);
        symbolList = require(path.join(process.cwd(), flags.path));
    }
    else {
        symbolList = args.sub;
    }
    if (!Array.isArray(symbolList) || symbolList.length === 0) {
        console.error('No symbols provided');
        return;
    }
    symbolList.forEach((symbolName) => {
        if (flags.all) {
            const wghtList = [
                100, 200, 300, 400, 500, 600, 700,
            ];
            const gradList = [-25, 0, 200];
            const fillList = [0, 1];
            const opszList = [20, 24, 40, 48];
            opszList.forEach((opsz) => {
                fillList.forEach((fill) => {
                    gradList.forEach((grad) => {
                        wghtList.forEach((wght) => {
                            downloadSymbolSVG(symbolName, {
                                ...flags,
                                opsz,
                                fill,
                                grad,
                                wght,
                            });
                        });
                    });
                });
            });
        }
        else {
            downloadSymbolSVG(symbolName, flags);
        }
    });
}
main();
