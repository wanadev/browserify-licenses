"use strict";

function outputStdout(text) {
    console.log(text);
    return text;
}

function outputFile(file, text) {
    throw new Error("NotImplementedError"); //TODO
}

module.exports = {
    stdout: outputStdout,
    file: outputFile
};
