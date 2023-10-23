# Material Symbols Picker

This cli tool allows you to load exact icons from Material Symbols repo.
With all this svgs you can easely build your own webfont.

## Why do you need it?

Material Symbols is huge webfont for displaying icons, but it's weight (more than 2mb) is too much for your usage.
Easy way to solve this - load only needed svgs by this cli tool and build your custom webfont or use them directly!

## Steps:

1. Install
2. Load symbols
3. Build font (optional)

## 1. Install

### Put package to devDependencies

```
npm i -D material-symbols-picker
```

## 2. Load symbols:

From project root run `npx msp` script with necessary params. Params list:

```
Usage: msp [options] [command] <symbolName>

Commands:
  help     Display help
  version  Display version

Options:
  -a, --all      For loading all states of symbol
  -d, --dest     Desination path (folder for storage svgs)
  -f, --fill     Material symbols fill option
  -g, --grad     Material symbols grad option
  -h, --help     Output usage information
  -o, --opsz     Material symbols opsz option
  -p, --path
    Path to json file with array of symbol names (if presented, other flags (f/g/o/w) ignored)
    Json content example with default setup: ["search", "menu"]
    Json content example with --raw option: ["search_24px", "menu_fill1_48px"]

  -r, --raw      Symbols have raw names. Example: dashboard_wght600_48px
  -v, --version  Output the version number
  -w, --wght     Material symbols wght option
```

Examples:

```
npx msp search dashboard -o 48 --wght 600
npx msp search -o 48 -w 600 -f 1 -g 200
npx msp open_in_new --all
npx msp search_24px search_wght600_24px --raw

```

## 3. Build (optional)

After downloading you need to build font with [webfont package](https://www.npmjs.com/package/webfont).
Use it!

Config example (webfontrc.json):

```
{
  "dest": "./dist",
  "fontName": "CustomMaterialSymbols",
  "fontHeight": 1000,
  "normalize": true
}
```

> That's all! <br>
> If you have any questions go to: malkovvladimir73@gmail.com
