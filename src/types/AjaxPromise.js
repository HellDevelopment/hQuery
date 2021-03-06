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

'use strict'; // https://www.w3schools.com/js/js_strict.asp

export default class AjaxPromise {
    /**
     * @param { Promise } promise the promise of the ajax request
     */
    constructor(promise) {
        this.promise = promise;
    }
    done(cb) {
        this.promise = this.promise.then((data) => {
            cb(data);
            return data;
        });
        return this;
    }
    then(cb) {
        this.promise = this.promise.then((data) => {
            cb(data);
            return data;
        });
        return this;
    }
    fail(cb) {
        this.promise = this.promise.catch(cb);
        return this;
    }
    catch(cb) {
        this.promise = this.promise.catch(cb);
        return this;
    }
    always(cb) {
        this.promise = this.promise.finally(cb);
        return this;
    }
    finally(cb) {
        this.promise = this.promise.finally(cb);
        return this;
    }
}
