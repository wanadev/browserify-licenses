"use strict";

const Q = require("q");
const table = require("table").default;
const getBorderCharacters = require("table").getBorderCharacters;
const chalk = require("chalk");

function formatTable(modules) {
    var data = [];
    var tableConfig = {
        border: getBorderCharacters("norc")
    };
    var stats = {
        moduleCount: modules.length,
        licenseWarning: 0,
        missingLicense: 0,
        missingLicenseFile: 0
    };

    for (let elm in tableConfig.border) {
        tableConfig.border[elm] = chalk.gray.dim(tableConfig.border[elm]);
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
            (module.license) ? (module.license.match(/bsd|mit|apache|isc|wtfpl/i)) ? module.license : chalk.yellow(module.license) : chalk.bgRed.white("None"),
            module.licenseFile ? chalk.green("Yes") : chalk.red("No"),
            module.noticeFile ? chalk.green("Yes") : chalk.gray("No")
        ]);
        if (!module.license) stats.missingLicense += 1;
        if (module.license && !module.license.match(/bsd|mit|apache|isc|wtfpl/i)) stats.licenseWarning += 1;
        if (!module.licenseFile) stats.missingLicenseFile += 1;
    }

    var result = table(data, tableConfig);
    result += `\n${modules.length} modules`;
    if (stats.licenseWarning || stats.missingLicense || stats.missingLicenseFile) {
        var licenseIssues = [];
        if (stats.licenseWarning) licenseIssues.push(chalk.yellow(`${stats.licenseWarning} warning(s)`));
        if (stats.missingLicenseFile) licenseIssues.push(chalk.red(`${stats.missingLicenseFile} missing license file(s)`));
        if (stats.missingLicense) licenseIssues.push(chalk.bgRed.white(`${stats.missingLicense} modules(s) without license`));
        result += "\nLicenses: " + licenseIssues.join(", ");
    }

    return result;
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

function formatJson(modules) {
    return JSON.stringify(modules, null, 2);
}

module.exports = {
    table: formatTable,
    short: formatShort,
    full: formatFull,
    json: formatJson
};
