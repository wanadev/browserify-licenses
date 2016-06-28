"use strict";

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
        chalk.cyan.bold("License File")
    ]);

    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        data.push([
            chalk.bold(module.name),
            module.version,
            module.license ? (module.license.match(/bsd|mit|apache|isc|wtfpl/i)) ? module.license : chalk.yellow(module.license) : chalk.bgRed.white("Unknown"),
            (module.licenseFile ? chalk.green("Yes") : chalk.red("No")) + (module.noticeFile ? " + notice" : "")
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

module.exports = formatTable;
