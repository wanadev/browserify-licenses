"use strict";

const fs = require("fs");

const Q = require("q");
const lodash = require("lodash");

const helpers = require("../helpers.js");

function _loadFromJson(jsonFile) {
    var modules = [];
    var jsonModules = JSON.parse(fs.readFileSync(jsonFile));

    for (let i = 0 ; i < jsonModules.length ; i++) {
        modules.push(helpers.newModule(jsonModules[i]));
    }

    return Q(modules);
}

function sourceJson(jsonList) {
    var promises = [];

    for (let i = 0 ; i < jsonList.length ; i++) {
        promises.push(_loadFromJson(jsonList[i]));
    }

    return Q.all(promises)
        .then(results => lodash.flatten(results));
}

module.exports = sourceJson;
