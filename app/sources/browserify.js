"use strict";

const browserify = require("browserify");
const through = require("through2");
const Q = require("q");
const lodash = require("lodash");

const extractors = require("../extractors");
const helpers = require("../helpers.js");

function _listBundledFiles(entryPointsPath, ignore) {
    return Q.Promise(function(resolve, reject) {
        var files = [];
        var b = browserify();
        if (ignore) {
            for (let i = 0 ; i < ignore.length ; i++) {
                b.exclude(ignore[i]);
            }
        }
        for (let i = 0 ; i < entryPointsPath.length ; i++) {
            b.add(entryPointsPath[i]);
        }
        b.pipeline.get("deps").push(through.obj(function(row, enc, next) {
            files.push(row.file);
            next();
        }));
        b.bundle(function(error, buffer) {
            if (error) {
                reject(error);
            } else {
                resolve(files);
            }
        });
    });
}

function sourceBrowserify(entryPointsPath, ignore) {
    return _listBundledFiles(entryPointsPath, ignore)
        .then(helpers.fileListToModule)
        .then(extractors.nodeModule);
}

module.exports = sourceBrowserify;
