"use strict";

const lodash = require("lodash");
const Q = require("q");

const source = require("./source.js");
const collect = require("./collect.js");
const format = require("./format.js");
const output = require("./output.js");

module.exports = function(input, options) {
    options = lodash.merge({
        source: "browserify",
        format: "table",
        output: "stdout",
        outputFile: null
    }, options || {});
    return Q(input)
        .then(source[options.source])
        .then(collect.collectInformations)
        .then(format[options.format])
        .then(output[options.output]);
};
