import type { LoadParams, SymbolParams } from "../index";
export declare const buildSymbolName: (name: string, params: SymbolParams) => string;
export declare const downloadSymbolSVG: (rawSymbolName: string, params: LoadParams) => Promise<void>;
export declare const extractSymbolName: (symbolNameWithParams: string) => string;
