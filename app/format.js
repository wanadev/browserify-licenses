"use strict";

const Q = require("q");
const table = require("table").default;
const getBorderCharacters = require("table").getBorderCharacters;
const chalk = require("chalk");

function formatTable(modules) {
    var data = [];
    var config = {
        border: getBorderCharacters("norc")
    };

    for (let elm in config.border) {
        config.border[elm] = chalk.gray.dim(config.border[elm]);
    }

    data.push([
        chalk.cyan.bold("Module Name"),
        chalk.cyan.bold("Version"),
        chalk.cyan.bold("License"),
        chalk.cyan.bold("License File"),
        chalk.cyan.bold("Notice File")
    ]);

    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        data.push([
            chalk.bold(module.name),
            module.version,
            (module.license.match(/bsd|mit|apache|isc/i)) ? module.license : chalk.yellow(module.license),
            module.licenseFile ? chalk.green("Yes") : chalk.red("No"),
            module.noticeFile ? chalk.green("Yes") : "No"
        ]);
    }

    return `${table(data, config)}\n${modules.length} modules`;
}

function formatShort(modules) {
    throw new Error("NotImplementedError"); // TODO
}

function formatFull(modules) {
    var licenses = [];

    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        let result = "";

        result += "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n";
        result += `${module.name} ${module.version} - License ${module.license}\n`;
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

module.exports = {
    table: formatTable,
    short: formatShort,
    full: formatFull
};
