"use strict";

const child_process = require("child_process");
const Q = require("q");

var _exec = Q.nfbind(child_process.exec);

var helpers = {
    exec: cmd => _exec(cmd).then(stdout => stdout[0].toString()),
    execJson: cmd => helpers.exec(cmd).then(JSON.parse)
};

module.exports = helpers;
