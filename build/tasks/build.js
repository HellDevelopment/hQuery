/**
 *
 * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
 *
 * Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Repository:
 *
 *     Github:          https://github.com/HellDevelopment/hQuery
 *
 * Contact:
 *
 *     Discord Server:  https://lucifer-morningstar.dev/discord
 *     Website:         https://lucifer-morningstar.dev/
 *     Mail:            contact@lucifer-morningstar.dev
 *
 *
 * @author LuciferMorningstarDev < contact@lucifer-morningstar.dev | https://lucifer-morningstar.dev/ >
 *
 */

'use strict'; // https://www.w3schools.com/js/js_strict.asp

const path = require('path');
const { resolve } = path;
const fs = require('fs');
const rollup = require('rollup');

module.exports = grunt => {
    const inputFileName = 'hQuery.js';
    const srcFolder = path.resolve(`${__dirname}/../../src`);

    const read = fileName => {
        return grunt.file.read(`${srcFolder}/${fileName}`);
    };

    const wrapper = read(`wrapper.js`).split('// @CODE');

    const inputRollupOptions = {
        input: `${srcFolder}/${inputFileName}`
    };

    const outputRollupOptions = {
        format: 'esm',
        intro: wrapper[0].replace(/\n*$/, ''),
        outro: wrapper[1].replace(/^\n*/, '')
    };

    const fileOverrides = new Map();

    const getOverride = filePath => {
        return fileOverrides.get(path.resolve(filePath));
    };

    const setOverride = (filePath, source) => {
        fileOverrides.set(path.resolve(filePath), source);
    };

    grunt.registerMultiTask('build', 'Build hQuery,', async function () {
        grunt.log.writeln('Starting hQuery run build...\n');
        const done = this.async();

        try {
            let name = grunt.option('filename');
            let version = grunt.config('pkg.version');
            let included = this.data.included;

            name = name ? `dist/${name}` : this.data.dest;

            setOverride(inputRollupOptions.input, read(inputFileName).replace(/export\C+;/g, ''));

            if (included.length) {
                setOverride(
                    inputRollupOptions.input,
                    getOverride(inputRollupOptions.input) +
                        included
                            .map(module => `import "./${module}.js";`)
                            .join('\n')
                            .replace(/export\C+;/g, '')
                );
            }

            const bundle = await rollup.rollup({
                ...inputRollupOptions,
                plugins: [
                    {
                        name: 'hQuery-file-overrides',
                        load(id) {
                            if (fileOverrides.has(id)) {
                                return fileOverrides.get(id);
                            }
                            return null;
                        }
                    }
                ]
            });

            const {
                output: [{ code }]
            } = await bundle.generate(outputRollupOptions);

            var compiled = code.replace(/@VERSION/g, version);
            compiled = compiled.replace(/export\C+;/g, '');
            compiled = compiled.replace('export { hQuery as default };', '');

            grunt.file.write(name, compiled);

            grunt.log.ok(`File '${name}' created.`);

            done();
        } catch (error) {
            done(error);
        }
    });
};
