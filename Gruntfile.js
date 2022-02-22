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

module.exports = (grunt) => {
    var fs = require('fs');
    var gzip = require('gzip-js');

    var stripJSONComments = require('strip-json-comments');

    function readOptionalJSON(filepath) {
        let data = {};
        try {
            data = JSON.parse(
                stripJSONComments(
                    fs.readFileSync(filepath, {
                        encoding: 'utf8'
                    })
                )
            );
        } catch (e) {}
        return data;
    }

    if (!grunt.option('filename')) {
        grunt.option('filename', 'hQuery.js');
    }

    var banner = `
/**
 * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
 *
 * hQuery v<%= pkg.version %> | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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
 */\n`;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dst: readOptionalJSON('dist/.destination.json'),
        authors: {
            prior: ['LuciferMorningstarDev <contact@lucifer-morningstar.dev>'],
            order: 'count'
        },
        eslint: {
            options: {
                overrideConfigFile: './.eslintrc.json'
            },
            target: ['src/*.js', 'src/types/*.js']
        },
        watch: {
            files: ['src/**/*.js'],
            tasks: ['uglify', 'compare_size']
        },
        build: {
            all: {
                dest: 'dist/hQuery.js',
                included: ['hQuery']
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/styles/alert.css': 'src/scss/alert.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/styles',
                        src: ['*.css', '!*.min.css'],
                        dest: 'dist/styles',
                        ext: '.min.css'
                    }
                ]
            }
        },
        uglify: {
            all: {
                files: {
                    "dist/<%= grunt.option('filename').replace('.js', '.min.js') %>": "dist/<%= grunt.option('filename') %>"
                },
                options: {
                    preserveComments: false,
                    sourceMap: true,
                    sourceMapName: "dist/<%= grunt.option('filename').replace('.js', '.min.map') %>",
                    report: 'min',
                    output: {
                        ascii_only: true
                    },
                    banner: banner,
                    compress: {
                        hoist_funs: false,
                        loops: false
                    }
                }
            }
        },
        compare_size: {
            files: ['src/<%= pkg.name %>.js', 'dist/<%= pkg.name %>.min.js'],
            options: {
                compress: {
                    gz: function (contents) {
                        return gzip.zip(contents, {}).length;
                    }
                },
                cache: 'build/.sizecache.json'
            }
        }
    });

    // Load grunt tasks from NPM packages
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('build/tasks');

    grunt.registerTask('default', ['eslint', 'build:*:*', 'sass', 'cssmin', 'uglify', 'compare_size', 'update-authors']);
};
