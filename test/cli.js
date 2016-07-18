"use strict";

const expect = require("expect.js");
const helpers = require("./helpers.js");

const VERSION = require("../package.json").version;

describe("brlicenses", function() {

    it("displays the help and exit with error when called without arguments", function() {
        return helpers.exec("bin/brlicenses")
            .then(function(stdout) {
                throw new Error("ShouldNotBeCalled");
            })
            .catch(function(error) {
                expect(error).to.match(/Command failed/);
                expect(error).to.match(/^Usage:/m);
            });
    });

    it("can display the help using --help option", function() {
        return helpers.exec("bin/brlicenses --help")
            .then(function(stdout) {
                expect(stdout).to.match(/^Usage:/);
            });
    });

    it("can display the help using -h option", function() {
        return helpers.exec("bin/brlicenses -h")
            .then(function(stdout) {
                expect(stdout).to.match(/^Usage:/);
            });
    });

    it("can display the version number using --version option", function() {
        return helpers.exec("bin/brlicenses --version")
            .then(function(stdout) {
                expect(stdout).to.equal(VERSION + "\n");
            });
    });

    it("can display the version number using -v option", function() {
        return helpers.exec("bin/brlicenses -v")
            .then(function(stdout) {
                expect(stdout).to.equal(VERSION + "\n");
            });
    });

    it("can extract licenses from a browserify entry point using positional arguments", function() {
        return helpers.execJson("bin/brlicenses test/samples/browserify-test.js test/samples/extra.js -f json")
            .then(function(modules) {
                expect(modules).to.have.length(6);
            });
    });

    it("can extract licenses from a browserify entry point using --browserify option", function() {
        return helpers.execJson("bin/brlicenses --browserify test/samples/browserify-test.js test/samples/extra.js -f json")
            .then(function(modules) {
                expect(modules).to.have.length(6);
            });
    });

    it("can extract licenses from a browserify entry point using -b option", function() {
        return helpers.execJson("bin/brlicenses -b test/samples/browserify-test.js test/samples/extra.js -f json")
            .then(function(modules) {
                expect(modules).to.have.length(6);
            });
    });

    it("can extract licenses from given modules using --modules option", function() {
        return helpers.execJson("bin/brlicenses --modules q buffer -f json")
            .then(function(modules) {
                expect(modules).to.have.length(5);
            });
    });

    it("can extract licenses from given modules using -m option", function() {
        return helpers.execJson("bin/brlicenses -m q buffer -f json")
            .then(function(modules) {
                expect(modules).to.have.length(5);
            });
    });

    it("can extract licenses from a json using --json option", function() {
        return helpers.execJson("bin/brlicenses --json test/samples/licenses.json test/samples/extra.json -f json")
            .then(function(modules) {
                expect(modules).to.have.length(5);
            });
    });

    it("can extract licenses from a json using -j option", function() {
        return helpers.execJson("bin/brlicenses -j test/samples/licenses.json test/samples/extra.json -f json")
            .then(function(modules) {
                expect(modules).to.have.length(5);
            });
    });

    it("can format licenses as a table (default)", function() {
        return helpers.exec("bin/brlicenses -j test/samples/licenses.json")
            .then(function(stdout) {
                expect(stdout).to.match(/Module Name.+Version.+License.+License File/);
                expect(stdout).to.match(/^5 modules/m);
                expect(stdout).to.match(/Licenses: 1 missing license file\(s\)/m);
            });
    });

    it("can format licenses as a table using --format=table option", function() {
        return helpers.exec("bin/brlicenses -j test/samples/licenses.json --format=table")
            .then(function(stdout) {
                expect(stdout).to.match(/Module Name.+Version.+License.+License File/);
                expect(stdout).to.match(/^5 modules/m);
                expect(stdout).to.match(/Licenses: 1 missing license file\(s\)/m);
            });
    });

    it("can format licenses as a table using -f table option", function() {
        return helpers.exec("bin/brlicenses -j test/samples/licenses.json -f table")
            .then(function(stdout) {
                expect(stdout).to.match(/Module Name.+Version.+License.+License File/);
                expect(stdout).to.match(/^5 modules/m);
                expect(stdout).to.match(/Licenses: 1 missing license file\(s\)/m);
            });
    });

    it("can format licenses in a 'short' version using --format=short option", function() {
        return helpers.exec("bin/brlicenses -j test/samples/licenses.json --format=short")
            .then(function(stdout) {
                expect(stdout).to.match(/^base64-js v/m);
                expect(stdout).to.match(/^buffer v/m);
                expect(stdout).not.to.match(/^~+$/m);
            });
    });

    it("can format licenses in a 'full' version using --format=full option", function() {
        return helpers.exec("bin/brlicenses -j test/samples/licenses.json --format=full")
            .then(function(stdout) {
                expect(stdout).to.match(/^base64-js v/m);
                expect(stdout).to.match(/^buffer v/m);
                expect(stdout).to.match(/^~+$/m);
            });
    });

    it("can format licenses to JSON using --format=json option", function() {
        return helpers.execJson("bin/brlicenses -j test/samples/licenses.json --format=json")
            .then(function(modules) {
                expect(modules).to.have.length(5);
            });
    });

    it("can can ignore modules using --ignore option", function() {
        return helpers.execJson("bin/brlicenses -j test/samples/licenses.json --ignore q buffer --format=json")
            .then(function(modules) {
                expect(modules).to.have.length(3);
            });
    });

    it("can can ignore modules using -i option", function() {
        return helpers.execJson("bin/brlicenses -j test/samples/licenses.json -i q buffer --format=json")
            .then(function(modules) {
                expect(modules).to.have.length(3);
            });
    });

});
