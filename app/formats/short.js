"use strict";

function formatShort(modules) {
    var result = "";

    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];

        result += `${module.name} v${module.version}:\n`;
        result += "\n";
        result += `  License: ${module.license || "Unknown"}\n`;
        result += `  downloaded from: https://www.npmjs.com/package/${module.name}\n`;
        result += "\n\n";
    }

    return result;
}

module.exports = formatShort;
