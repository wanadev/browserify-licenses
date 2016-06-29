"use strict";

const path = require("path");

const Q = require("q");

const extractors = require("../extractors");
const helpers = require("../helpers.js");

function _moduleListToModule(moduleList) {
    var modules = [];

    for (let i = 0 ; i < moduleList.length ; i++) {
        modules.push(helpers.newModule({
            name: moduleList[i],
            path: path.join(process.cwd(), "node_modules", moduleList[i])
        }));
    }

    return modules;
}

function sourceModules(moduleList) {
    return Q(moduleList)
        .then(_moduleListToModule)
        .then(extractors.nodeModule);
}

module.exports = sourceModules;
