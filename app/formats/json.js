"use strict";

function formatJson(modules) {
    return JSON.stringify(modules, null, 2);
}

module.exports = formatJson;
