"use strict";

const path = require("path");
const fs = require("fs");

const spdxParse = require("spdx-expression-parse");
const Q = require("q");

function _getPackageJsonInformations(modules) {
    for (let i = 0 ; i < modules.length ; i++) {
        let module = modules[i];
        let pkg = require(path.join(module.path, "package.json"));

        module.version = pkg.version;
        if (module.version.match(/^https?:\/\/.+-([0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9._-]+)?)\.tgz$/i)) {
            module.version = module.version.replace(/^https?:\/\/.+-([0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9._-]+)?)\.tgz$/i, "$1");
        }

        module.licenseURLs = [];
        if (pkg.license && typeof pkg.license == "string") {
            module.license = pkg.license;
            _getSpdxLicenseInformation(module.license).forEach(function(license) {
                module.licenseURLs.push("https://spdx.org/licenses/" + license + ".html");
            });
        }
        else if (pkg.license && Array.isArray(pkg.license) || pkg.licenses && Array.isArray(pkg.licenses)) {
            let licenses = (pkg.license) ? pkg.license : pkg.licenses;
            let licenseList = [];
            for (var j = 0 ; j < licenses.length ; j++) {
                licenseList.push(licenses[j].type || licenses[j].name);
                module.license = licenseList.join(" / ");
                if (licenses[j].url) {
                    module.licenseURLs.push(licenses[j].url);
                }
            }
        } else if (pkg.license && typeof(pkg.license) == "object") {
            module.license = pkg.license.type || pkg.license.name;
            if (pkg.license.url) {
                module.licenseURLs.push(pkg.license.url);
            }
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

function _getSpdxLicenseInformation(license) {
    var licenses = [];
    try {
        var tree;
        if (typeof license === "string") {
            tree = spdxParse(license);
        } else {
            tree = license;
        }
        if (tree.license) {
            licenses.push(tree.license);
        }
        if (tree.left) {
            licenses = licenses.concat(_getSpdxLicenseInformation(tree.left));
        }
        if (tree.right) {
            licenses = licenses.concat(_getSpdxLicenseInformation(tree.right));
        }
    } catch(e) {
        console.warn(`WARNING: Unable to parse license "${license}"`);
    }
    return licenses;
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

function extractorNodeModule(modules) {
    return Q(modules)
        .then(_getPackageJsonInformations)
        .then(_findLicenseFiles)
        .then(_readLicenseText);
}

module.exports = extractorNodeModule;
