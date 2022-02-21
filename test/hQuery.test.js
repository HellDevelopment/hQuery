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

import $ from '../src/hQuery.js';

const fakeAPI = 'https://jsonplaceholder.typicode.com';

$(async () => {
    console.log('========================================================================================');
    console.log('Starting tests...');

    console.log('========================================================================================');

    console.log('Query Test -> document -> %o', $(document));
    console.log('Query single element -> element -> %o', $('.test'));
    console.log('Query more elements -> elements -> %o', $('!.test'));

    try {
        console.log('Query null element -> element');
        $('.test-2asf');
    } catch (err) {
        console.error(err);
    }

    console.log('========================================================================================');

    // ==================================================================================================================================================
    console.log(`Defaults.isArray(true) -> result -> ${$.isArray([])}`);
    console.log(`Defaults.isArray(false) -> result -> ${$.isArray({})}`);
    console.log('========================================================================================');
    console.log(`Defaults.isPlainObject(true) -> result -> ${$.isPlainObject({})}`);
    console.log(`Defaults.isPlainObject(false) -> result -> ${$.isPlainObject('asdf')}`);
    console.log('========================================================================================');
    console.log(`Defaults.isEmptyObject(true) -> result -> ${$.isEmptyObject({})}`);
    console.log(`Defaults.isEmptyObject(false) -> result -> ${$.isEmptyObject({ a: '' })}`);
    console.log('========================================================================================');
    console.log(`Defaults.isFunction(true) -> result -> ${$.isFunction(() => {})}`);
    console.log(`Defaults.isFunction(false) -> result -> ${$.isFunction({})}`);
    console.log('========================================================================================');
    console.log(`Defaults.isNotNull(true) -> result -> ${$.isNotNull({})}`);
    console.log(`Defaults.isNotNull(false) -> result -> ${$.isNotNull(null)}`);
    console.log('========================================================================================');
    // ==================================================================================================================================================

    $.append('testAppend', () => {});
    console.log(`Defaults.append -> result -> ok`);
    try {
        $.append('testAppend', () => {});
    } catch (err) {
        console.error(err);
        console.log(`Defaults.append -> result -> errored`);
    }

    console.log('========================================================================================');

    console.log('hQuery.getJSON -> data -> %o', await $.getJSON(fakeAPI + '/todos/1'));

    console.log('============================= TESTING ELEMENT MANIPULATION =============================');

    $('!.test').html('asdf'); // add "asdf" content to each div.test
    console.log('hQuery.QueriedCol/El.html -> content');

    console.log('============================================================================');

    var toggleClassStep = 0;

    var switchColors = () => {
        if (toggleClassStep == 0) {
            $('#test-1').removeClass('fg-green');
            $('#test-2').removeClass('bg-red');

            $('#test-1').addClass('fg-red');
            $('#test-2').addClass('bg-green');
            toggleClassStep++;
        } else {
            $('#test-1').removeClass('fg-red');
            $('#test-2').removeClass('bg-green');

            $('#test-1').addClass('fg-green');
            $('#test-2').addClass('bg-red');
            toggleClassStep = 0;
        }

        $('#test-3').css('color', '#' + Math.floor(Math.random() * 16777215).toString(16));
    };
    console.log('Change colors of elements');
    switchColors();
    setInterval(switchColors, 1000);

    console.log('============================================================================');

    var startTime = () => {
        var pad = (n) => ('00' + n).substring(('' + n).length);
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        $('#clock-time').html(pad(h) + ':' + pad(m) + ':' + pad(s));
        setTimeout(startTime, 1000);
    };

    console.log('Starting clock...');
    $('#clock-time').css('font-family', 'Ubuntu, sans-serif');
    startTime();

    console.log('============================= TESTING ELEMENT MANIPULATION =============================');

    console.log('Tests done...');
    console.log('========================================================================================');
});
