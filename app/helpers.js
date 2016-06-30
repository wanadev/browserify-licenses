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
            website: null
        }, data || {});
}

function getModulePath(moduleName) {
    return path.dirname(require.resolve(`${moduleName}/package.json`));
}

module.exports = {
    newModule: newModule,
    getModulePath: getModulePath
};
