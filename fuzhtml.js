#!/usr/bin/env node

const fs = require('fs'),
    path = require('path'),
    minimist = require('minimist');

const {
    parseFolder
} = require('./lib/parse-folder');

const appVersion = '2.0.0';

var argv = minimist(process.argv.slice(2));

var parseArgv = function(shortArg, longArg, typeArg, defaultVal) {
    let argVal;
    if (!!argv[shortArg] && typeof argv[shortArg] == typeArg) {
        argVal = argv[shortArg];
    } else if (!!argv[longArg] && typeof argv[longArg] == typeArg) {
        argVal = argv[longArg];
    } else {
        argVal = defaultVal;
    }
    return argVal;
};

var help = parseArgv('help', 'h', 'boolean', false),
    version = parseArgv('version', 'v', 'boolean', false),
    watch = parseArgv('watch', 'w', 'boolean', false),
    srcPath = parseArgv('src', 's', 'string', __dirname);

if (help) {
    console.log(`Options:
  -h, --help           show help information
  -v, --version        show version details
  -w, --watch          rebuild in watch mode
  -s, --src            set source directory's path
    `);
} else if (version) {
    console.log(`
 FUZHTML
 Version ` + appVersion + `
 Cross platform tool to fuse multiple child html templates into parent html
    `);
} else if (watch) {
    if (!!srcPath) {
        const fullPath = path.join(process.cwd(), srcPath);
        const chokidar = require('chokidar');

        const options = parseFolder(fullPath, true);
        const watcher = chokidar.watch(fullPath, {
            ignored: [/^\./, ...options.ignores],
            ignoreInitial: true
        });
        watcher.on('all', (event, path) => {
            Logger.info(event, path);
            parseFolder(fullPath);
        });
    } else {
        console.log("Error: Missing source directory's path (src)");
    }
} else {
    if (!!srcPath) {
        const fullPath = path.join(process.cwd(), srcPath);
        parseFolder(fullPath);
    } else {
        console.log("Error: Missing source directory's path (src)");
    }
}