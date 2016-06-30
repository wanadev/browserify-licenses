"use strict";

const lodash = require("lodash");
const Q = require("q");

const sources = require("./sources");
const formats = require("./formats");
const writers = require("./writers");

function _source(browserify, modules, json, ignore) {
    var sourcePromises = [];

    if (browserify) {
        sourcePromises.push(sources.browserify(browserify, ignore));
    }

    if (modules) {
        sourcePromises.push(sources.modules(modules));
    }

    if (json) {
        sourcePromises.push(sources.json(json));
    }

    return Q.all(sourcePromises)
        .then(results => lodash.flatten(results));
}

function _filterIgnored(ignored, modules) {
    if (!ignored) {
        return modules;
    }
    return lodash.filter(modules, m => !lodash.includes(ignored, m.name));
}

function _sort(modules) {
    return lodash.sortBy(modules, "name");
}

module.exports = function(options) {
    return _source(options.browserify, options.modules, options.json, options.ignore)
        .then(_filterIgnored.bind(undefined, options.ignore))
        .then(_sort)
        .then(formats[options.format])
        .then(options.output ? writers.file.bind(undefined, options.output) : writers.stdout);
};
