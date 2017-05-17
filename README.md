# Browserify License Extractor

[![Build Status](https://travis-ci.org/wanadev/browserify-licenses.svg?branch=master)](https://travis-ci.org/wanadev/browserify-licenses)
[![NPM Version](http://img.shields.io/npm/v/browserify-licenses.svg?style=flat)](https://www.npmjs.com/package/browserify-licenses)
[![License](http://img.shields.io/npm/l/browserify-licenses.svg?style=flat)](https://github.com/wanadev/browserify-licenses/blob/master/LICENSE)
[![Dependencies](https://img.shields.io/david/wanadev/browserify-licenses.svg?maxAge=2592000)]()
[![Dev Dependencies](https://img.shields.io/david/dev/wanadev/browserify-licenses.svg?maxAge=2592000)]()
[![Greenkeeper badge](https://badges.greenkeeper.io/wanadev/browserify-licenses.svg)](https://greenkeeper.io/)


> Extracts licenses of third party modules used in a browserify bundle

Browserify License Extractor list all files that will be included in
a Browerify bundle to determines which third party modules are *really*
bundled, and then it extracts the corresponding licenses to various formats.


## Install

    npm install -g browserify-licenses


## Usage

    Usage: brlicenses [options]

    Options:
        --browserify, -b  Extract licenses used in a bundle using Browserify to find
                          included modules (this option can be ommited)
        --modules, -m     Extract licenses of the given modules
        --json, -j        Extract licenses of the given JSON files (previously
                          generated with the --format=json option)
        --format, -f      Output format [choices: "table", "short", "full", "json"]
                          [default: "table"]
        --output, -o      Output file (print to stdout by default)
        --ignore, -i      Ingore the given modules in the output
        --version, -v     Show version number
        --help, -h        Show help


## Examples

    brlicenses app/index.js
    brlicenses --browserify app/index.js  # equivalent to the previous one

    brlicenses --modules lodash q abitbol

    brlicenses app/index.js \
        --json additional-licenses.json \
        --format=full \
        --output=CREDITS.txt


## Sample Output

Table formatting (to get a quick overview):

    brlicenses app/index.js

    ┌─────────────┬─────────┬──────────────┬──────────────┐
    │ Module Name │ Version │ License      │ License File │
    ├─────────────┼─────────┼──────────────┼──────────────┤
    │ abitbol     │ 1.0.4   │ BSD-3-Clause │ Yes          │
    │ keyboardjs  │ 0.4.3   │ BSD License  │ Yes          │
    │ lodash      │ 4.13.1  │ MIT          │ Yes          │
    │ photonui    │ 1.5.0   │ BSD-3-Clause │ Yes          │
    │ stonejs     │ 2.2.0   │ BSD-3-Clause │ Yes          │
    │ uuid        │ 2.0.2   │ MIT          │ Yes          │
    └─────────────┴─────────┴──────────────┴──────────────┘

    6 modules

Full output includes complete license:

    brlicenses --format=full app/index.js

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    abitbol v1.0.4 - License BSD-3-Clause
    downloaded from <https://www.npmjs.com/package/abitbol>
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Copyright (c) 2015, Wanadev <http://www.wanadev.fr/>
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
        * Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
        * Neither the name of Wanadev nor the
        names of its contributors may be used to endorse or promote products
        derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL WANADEV BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    keyboardjs v0.4.3 - License BSD License
    downloaded from <https://www.npmjs.com/package/keyboardjs>
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Copyright 2011 Robert Hurst. All rights reserved.

    [... output truncated for this example ...]


## Changelog

* **1.4.4:** Updates Yargs and Table deps
* **1.4.3:** Updates Browserify to 14.0.0
* **1.4.2:** Works on Microsoft Windows™ system
* **1.4.1:** Updates `yargs` dependency

