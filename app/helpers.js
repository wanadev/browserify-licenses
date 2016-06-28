"use strict";

var lodash = require("lodash");

function newModule(data) {
    return lodash.merge({
            name: null,
            path: null,
            version: null,
            license: null,
            licenseFile: null,
            licenseText: null,
            noticeFile: null,
            noticeText: null
        }, data || {});
}

module.exports = {
    newModule: newModule
};
