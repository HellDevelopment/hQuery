/**
 *
 * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
 *
 * hQuery v@VERSION | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

(function (global, factory) {
    'use strict'; // https://www.w3schools.com/js/js_strict.asp
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document
            ? factory(global, true)
            : function (window) {
                  if (!window.document) {
                      throw new Error('hQuery requires a window with a document');
                  }
                  return factory(window);
              };
    } else {
        factory(global);
    }
})(typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';

    // @CODE

    window['$'] = hQuery;
    window['hQuery'] = hQuery;
    return hQuery;
});
