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

// checking for some global scopes ( hQuery needs a window and document object )
if (typeof window === 'undefined' || typeof document === 'undefined' || typeof window.document === 'undefined')
    throw new Error(`Missing scopes...  'window': ${typeof window !== 'undefined'} , 'window.document':  ${typeof window.document !== 'undefined'}, 'document':  ${typeof document !== 'undefined'}`);

import AjaxPromise from './types/AjaxPromise.js';
import QueriedElement from './types/QueriedElement.js';
import QueriedElementCollection from './types/QueriedElementCollection.js';

// Regex to validate html
const htmlRegex =
    /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i;

/**
 * Test if an element given by string is valid html by using DOMParser and Regex
 * @param { String } name
 * @returns { Boolean } isValidHtml
 */
function isHTML(input) {
    try {
        var doc = new DOMParser().parseFromString(input, 'text/html');
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1) && htmlRegex.test(input);
    } catch (error) {
        return false;
    }
}

/**
 * @param {HTMLElement | Function | String | Array<HTMLElement>} elementsOrFunctionOrSelector
 * @returns {QueriedElement | QueriedElementCollection<QueriedElement>} collectionOrElement
 */
function hQuery(...elementsOrFunctionOrSelector) {
    if (elementsOrFunctionOrSelector.length <= 0) throw new Error('Cannot select from nothing');
    if (elementsOrFunctionOrSelector[0] instanceof QueriedElementCollection || elementsOrFunctionOrSelector[0] instanceof QueriedElement) return elementsOrFunctionOrSelector[0];

    if (typeof elementsOrFunctionOrSelector[0] === 'function') {
        return new QueriedElement(document).ready(elementsOrFunctionOrSelector[0]);
    }

    if (elementsOrFunctionOrSelector[0] instanceof HTMLElement || elementsOrFunctionOrSelector[0] === document) {
        return new QueriedElement(elementsOrFunctionOrSelector[0]);
    }

    if (typeof elementsOrFunctionOrSelector[0] === 'string') {
        var selector = elementsOrFunctionOrSelector[0];

        if (isHTML(selector)) {
            return new QueriedElement(document.createElement('div')).html(selector);
        }

        if (selector.startsWith('!')) {
            return new QueriedElementCollection(...document.querySelectorAll(selector.substring(1).trimStart()));
        } else return new QueriedElement(document.querySelector(selector));
    }

    if (typeof elementsOrFunctionOrSelector[0] === 'array') return new QueriedElementCollection(elementsOrFunctionOrSelector[0]);

    return new QueriedElementCollection(...elementsOrFunctionOrSelector);
}

/**
 * @param { String } name
 * @param {*} value
 */
hQuery.append = (name, value) => {
    if (typeof hQuery[name] === 'undefined') {
        hQuery[name] = value;
    } else throw new Error(`Cannot append hQuery by '${name}' this property exists`);
};

hQuery.htmlRegex = htmlRegex;
hQuery.isHTML = isHTML;

/**
 * @param {*} check
 * @returns { Boolean } if the given to check variable s an empty object
 */
hQuery.isEmptyObject = check => typeof check === 'object' && check !== null && Object.keys(check).length <= 0;

/**
 * @param {*} check
 * @returns { Boolean } if the given to check variable is a plain object ( To check if its empty use hQuery.isEmptyObject(check) )
 */
hQuery.isPlainObject = check => typeof check === 'object';

/**
 * @param {*} check
 * @returns { Boolean } if the given to check variable is an array
 */
hQuery.isArray = check => Array.isArray(check);

/**
 * @param {*} check
 * @returns { Boolean } if the given to check variable is a function
 */
hQuery.isFunction = check => typeof check === 'function';

/**
 * @param {*} check
 * @returns { Boolean } if the given to check variable is not null (check !== null && check !== undefined)
 */
hQuery.isNotNull = check => check !== null && check !== undefined;

/**
 * @param { String } url
 * @param { Object } headers
 * @param { Object } query
 * @param { Function } success
 * @param { String } dataType
 * @returns { AjaxPromise }
 */
hQuery.getJSON = (url, headers = {}, query = {}, success = () => {}, dataType = 'application/json; charset=UTF-8') => {
    var queryString = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    if (!headers['Content-Type']) headers['Content-Type'] = dataType;
    return new AjaxPromise(
        fetch(`${url}?hQuery=&${queryString}`, {
            method: 'GET',
            headers: headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Status Error: ' + res.status);
                }
            })
            .then(data => {
                success(data);
                return data;
            })
            .catch(error => {
                throw new Error(error);
            })
    );
};

/**
 * @param { String } url
 * @param { Object } options
 * @param { Function } success
 * @returns { AjaxPromise }
 */
hQuery.get = (url, options = {}, success = () => {}) => {
    options.method = 'GET';
    return new AjaxPromise(
        fetch(url, options)
            .then(response => {
                success(response);
                return response;
            })
            .catch(error => {
                throw new Error(error);
            })
    );
};

/**
 * @param { String } url
 * @param { Object } options
 * @param { Function } success
 * @returns { AjaxPromise }
 */
hQuery.post = (url, options = {}, success = () => {}) => {
    options.method = 'POST';
    return new AjaxPromise(
        fetch(url, options)
            .then(response => {
                success(response);
                return response;
            })
            .catch(error => {
                throw new Error(error);
            })
    );
};

/**
 * @param { String } url
 * @param { Object } formData
 * @param { Object } options
 * @param { Function } success
 * @returns { AjaxPromise }
 */
hQuery.postFormData = (url, formData = {}, options = {}, success = () => {}) => {
    if (hQuery.isPlainObject(formData)) {
        function getFormData(object) {
            const formData = new FormData();
            Object.keys(object).forEach(key => formData.append(key, object[key]));
            return formData;
        }
        formData = getFormData(formData);
    }
    options.method = 'POST';
    options['Content-Type'] = 'application/x-www-form-urlencoded';
    options.body = formData;
    return new AjaxPromise(
        fetch(url, options)
            .then(response => {
                success(response);
                return response;
            })
            .catch(error => {
                throw new Error(error);
            })
    );
};

/**
 * @param { String } name the name/key of a cookie
 * @param { * } value if not provided you run a search for a cookie by the given name
 * @param { Number } days default 5years
 * @param { String } path optional
 * @returns { String | Null } value
 */
hQuery.cookie = (name, value, days, path) => {
    if (!value) {
        // get cookie
        var nameEQ = encodeURIComponent(name) + '=';
        var cookieArray = document.cookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookieCurrent = cookieArray[i];
            while (cookieCurrent.charAt(0) === ' ') cookieCurrent = cookieCurrent.substring(1, cookieCurrent.length);
            if (cookieCurrent.indexOf(nameEQ) === 0) return decodeURIComponent(cookieCurrent.substring(nameEQ.length, cookieCurrent.length));
        }
        return null;
    }
    if (!days) return hQuery.cookie(name, value, 365 * 5, path);

    var expires;
    var date = new Date(Date.vow() + days * 24 * 60 * 60 * 1000);
    date.setTime();
    expires = '; expires=' + date.toUTCString();
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=' + path != null ? path : '/';
    return value;
};

export default hQuery;
