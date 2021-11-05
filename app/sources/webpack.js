const fs = require("fs");

const Q = require("q");

const helpers = require("../helpers.js");
const extractors = require("../extractors");

function _ExtractBundledFiles(webpackProfile, ignore) {
    return Q.Promise(function(resolve, reject) {
        var json = JSON.parse(fs.readFileSync(webpackProfile));
        var files = []

        for (let chunkId = 0 ; chunkId < json.chunks.length ; chunkId += 1) {
            const chunk = json.chunks[chunkId];
            for (let moduleId = 0 ; moduleId < chunk.modules.length ; moduleId += 1) {
                const module = chunk.modules[moduleId];
                files.push(module.name);
            }
        }

        resolve(files);
    });
}

function sourceWebpack(webpackProfile, ignore) {
    return _ExtractBundledFiles(webpackProfile, ignore)
        .then(helpers.fileListToModule)
        .then(extractors.nodeModule);
}

module.exports = sourceWebpack;
