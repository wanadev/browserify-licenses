"use strict";

function formatFull(modules) {
    var licenses = [];

    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        let result = "";

        result += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
        result += `${module.name} ${module.version} - License ${module.license || "Unknown"}\n`;
        result += `downloaded from <https://www.npmjs.com/package/${module.name}>\n`;
        result += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
        if (module.noticeText) {
            result += module.noticeText;
            if (module.noticeText[module.noticeText.length-1] !== "\n") {
                result += "\n";
            }
            result += "\n";
        }
        if (module.licenseText) {
            result += module.licenseText;
            if (module.licenseText[module.licenseText.length-1] !== "\n") {
                result += "\n";
            }
        } else {
            result += "No license file were provided in the module. You may find the license text on\n";
            result += `the project's page or at <http://spdx.org/licenses/${module.license}>.\n`;
        }
        result += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";

        licenses.push(result);
    }

    return licenses.join("\n\n\n\n");
}

module.exports = formatFull;
