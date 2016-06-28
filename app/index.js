"use strict";

const lodash = require("lodash");
const Q = require("q");

const sources = require("./sources");
const formats = require("./formats");
const writers = require("./writers");

module.exports = function(input, options) {
    options = lodash.merge({
        source: "browserify",
        format: "table",
        output: "stdout",
        outputFile: null
    }, options || {});
    return Q(input)
        .then(sources[options.source])
        .then(formats[options.format])
        .then(writers[options.output]);
};
