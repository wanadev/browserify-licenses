"use strict";

const fs = require("fs");

const Q = require("q");

function writerFile(filePath, text) {
    var fd = fs.openSync(filePath, "w");
    fs.writeSync(fd, text);
    fs.closeSync(fd);
    return Q(text);

}

module.exports = writerFile;
