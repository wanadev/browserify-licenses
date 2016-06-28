# Browserify License Extractor

> Extracts licenses of third party modules used in a browserify bundle

Browserify License Extractor list all files that will be included in
a Browerify bundle to determines which third party modules are *really*
bundled, and then it extracts the corresponding licenses to various formats.

## Install

    npm install -g browserify-licenses


## Usage

    brlicenses [options] <input>

    <input>               Input file (entry point of the app)

    -f, --format=FORMAT   Generated format ('table' (default), 'short', 'full')
    -h, --help            display help & usage
    -o, --output=OUTPUT   Oputput file (default: stdout)
    -s, --source=SOURCE   Source type (currently, only 'browserify' (default) is supported)
    -v, --version         display cli name & version


## Examples:

Table formatting (to get a quick overview):

    brlicenses app/index.js

    ┌─────────────┬─────────┬──────────────┬──────────────┐
    │ Module Name │ Version │ License      │ License File │
    ├─────────────┼─────────┼──────────────┼──────────────┤
    │ abitbol     │ 1.0.3   │ BSD-3-Clause │ Yes          │
    ├─────────────┼─────────┼──────────────┼──────────────┤
    │ keyboardjs  │ 0.4.3   │ BSD License  │ Yes          │
    ├─────────────┼─────────┼──────────────┼──────────────┤
    │ lodash      │ 4.11.1  │ MIT          │ Yes          │
    ├─────────────┼─────────┼──────────────┼──────────────┤
    │ stonejs     │ 2.2.0   │ BSD-3-Clause │ Yes          │
    ├─────────────┼─────────┼──────────────┼──────────────┤
    │ uuid        │ 2.0.2   │ MIT          │ Yes          │
    └─────────────┴─────────┴──────────────┴──────────────┘

Full output includes complete license:

    brlicenses --format=full app/index.js

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    abitbol 1.0.3 - License BSD-3-Clause
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
    keyboardjs 0.4.3 - License BSD License
    downloaded from <https://www.npmjs.com/package/keyboardjs>
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    Copyright 2011 Robert Hurst. All rights reserved.

    [... output truncated for this example ...]

