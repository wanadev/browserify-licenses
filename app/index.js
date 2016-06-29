"use strict";

const lodash = require("lodash");
const Q = require("q");

const sources = require("./sources");
const formats = require("./formats");
const writers = require("./writers");

function _source(browserify, modules, json) {
    var sourcePromises = [];

    if (browserify) {
        sourcePromises.push(sources.browserify(browserify));
    }

    if (modules) {
        sourcePromises.push(sources.modules(modules));
    }

    if (json) {
        sourcePromises.push(sources.json(json));
    }

    return Q.all(sourcePromises)
        .then(function (results) {
            return lodash.flatten(results);
        });
}

function _filterIgnored(ignored, modules) {
    if (!ignored) {
        return modules;
    }
    return lodash.filter(modules, m => !lodash.includes(ignored, m.name));
}

module.exports = function(options) {
    return _source(options.browserify, options.modules, options.json)
        .then(_filterIgnored.bind(undefined, options.ignore))
        .then(formats[options.format])
        .then(writers.stdout);  //FIXME
};
