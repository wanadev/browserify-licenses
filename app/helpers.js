"use strict";

var path = require("path");

var lodash = require("lodash");

function newModule(data) {
    return lodash.merge({
            name: null,
            path: null,
            version: null,
            license: null,
            licenseFile: null,
            licenseText: null,
            noticeFile: null,
            noticeText: null,
            licenseURLs: [],
            website: null
        }, data || {});
}

function getModulePath(moduleName) {
    return path.dirname(require.resolve(`${moduleName}/package.json`));
}

function fileListToModule(files) {
    var modules = [];
    var modulePaths = {};
    for (let i = 0 ; i < files.length ; i++) {
        if (files[i].indexOf("node_modules") < 0) {
            continue;
        }
        let file = files[i];
        let module = newModule({
            name: file.replace(/^(.*node_modules[/\\]((@[^/\\]+[/\\])?[^/\\]+)[/\\]).*$/, "$2"),
            path: file.replace(/^(.*node_modules[/\\]((@[^/\\]+[/\\])?[^/\\]+)[/\\]).*$/, "$1"),
        });
        module.website = `https://www.npmjs.com/package/${module.name}`;
        if (!modulePaths[module.path]) {
            modulePaths[module.path] = true;
            modules.push(module);
        }
    }
    return modules;
}

module.exports = {
    newModule: newModule,
    getModulePath: getModulePath,
    fileListToModule: fileListToModule
};
