"use strict";

const path = require("path");

const Q = require("q");
const lodash = require("lodash");

const extractors = require("../extractors");
const helpers = require("../helpers.js");

function _listDependencies(moduleList) {
    var deps = [];

    function _getDep(moduleName) {
        if (lodash.includes(deps, moduleName)) {
            return;
        }
        deps.push(moduleName);
        var modulePkg = require(`${moduleName}/package.json`);
        if (!modulePkg.dependencies) return;
        var moduleDeps = Object.keys(modulePkg.dependencies);
        for (let i = 0 ; i < moduleDeps.length ; i++) {
            _getDep(moduleDeps[i]);
        }
    }

    for (let i = 0 ; i < moduleList.length ; i++) {
        _getDep(moduleList[i]);
    }

    return deps;
}

function _moduleListToModule(moduleList) {
    var modules = [];

    for (let i = 0 ; i < moduleList.length ; i++) {
        modules.push(helpers.newModule({
            name: moduleList[i],
            path: helpers.getModulePath(moduleList[i]),
            website: `https://www.npmjs.com/package/${moduleList[i]}`
        }));
    }

    return modules;
}

function sourceModules(moduleList) {
    return Q(moduleList)
        .then(_listDependencies)
        .then(_moduleListToModule)
        .then(extractors.nodeModule);
}

module.exports = sourceModules;
