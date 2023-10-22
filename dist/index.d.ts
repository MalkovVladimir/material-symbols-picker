#!/usr/bin/env node
export type SymbolParams = {
    fill?: 0 | 1;
    wght?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    grad?: -25 | 0 | 200;
    opsz?: 20 | 24 | 40 | 48;
};
export type LoadParams = SymbolParams & {
    type?: "outlined" | "rounded" | "sharp";
    all?: boolean;
    path?: string;
    dest?: string;
    raw?: boolean;
};
