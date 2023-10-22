"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        name: "fill",
        description: "Material symbols fill option",
    },
    {
        name: "wght",
        description: "Material symbols wght option",
    },
    {
        name: "grad",
        description: "Material symbols grad option",
    },
    {
        name: "opsz",
        description: "Material symbols opsz option",
    },
    {
        name: "all",
        description: "For loading all states of symbol",
    },
    {
        name: "path",
        description: `
      Path to json file with array of symbol names (if presented, other flags ignored)
      Json content example with default setup: ["search", "search"]
      Json content example with --raw option: ["search_20px", "search_fill1_20px"]
    `,
    },
    {
        name: "dest",
        description: "Desination path (folder for storage svgs)",
    },
    {
        name: "raw",
        description: "Symbols have raw names. Example: dashboard_wght600_48px",
    },
];
