"use strict";

const path = require("path");
const fs = require("fs");

const Q = require("q");

function _extractPackageInformations(modules) {
    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        let pkg = require(path.join(module.path, "package.json"));

        module.version = pkg.version;

        if (pkg.license && typeof pkg.license == "string") {
            module.license = pkg.license;
        }
        else if (pkg.license && Array.isArray(pkg.license) || pkg.licenses && Array.isArray(pkg.licenses)) {
            let licenses = (pkg.license) ? pkg.license : pkg.licenses;
            let licenseList = [];
            for (var j = 0 ; j < licenses.length ; j++) {
                licenseList.push(licenses[j].type || licenses[j].name);
                module.license = licenseList.join(" / ");
            }
        } else if (pkg.license && typeof(pkg.license) == "object") {
            module.license = pkg.license.type || pkg.license.name;
        }

    }
    return modules;
}

function _findLicenseFiles(modules) {
    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        var files = fs.readdirSync(module.path);

        for (var j = 0 ; j < files.length ; j++) {
            if (files[j].match(/(LICENSE|LICENCE|COPYING)/i)) {
                module.licenseFile = files[j];
                if (module.noticeFile) break;
            } else if (files[j].match(/NOTICE/i)) {
                module.noticeFile = files[j];
                if (module.licenseFile) break;
            }
        }
    }
    return modules;
}

function _readLicenseText(modules) {
    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        if (module.licenseFile) {
            module.licenseText = fs.readFileSync(path.join(module.path, module.licenseFile)).toString().replace(/\r?\n/g, "\n");
        }
        if (module.noticeFile) {
            module.noticeText = fs.readFileSync(path.join(module.path, module.noticeFile)).toString().replace(/\r?\n/g, "\n");
        }
    }
    return modules;
}

function collectInformations(modules) {
    return Q(modules)
        .then(_extractPackageInformations)
        .then(_findLicenseFiles)
        .then(_readLicenseText);
}

module.exports = {
    collectInformations: collectInformations
};
