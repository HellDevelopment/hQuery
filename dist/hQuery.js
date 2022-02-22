/**
 *
 * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
 *
 * hQuery v0.0.1 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    'use strict';

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.1 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    class AjaxPromise {
        /**
         * @param { Promise } promise the promise of the ajax request
         */
        constructor(promise) {
            this.promise = promise;
        }
        done(cb) {
            this.promise = this.promise.then(data => {
                cb(data);
                return data;
            });
            return this;
        }
        then(cb) {
            this.promise = this.promise.then(data => {
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

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.1 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    class QueriedElement {
        /**
         * @param { HTMLElement  | QueriedElement }
         */
        constructor(htmlElement) {
            if (!htmlElement) throw new Error('the given HTMLElement cannot be null');
            if (htmlElement === document) htmlElement = document.body;
            if (!(htmlElement instanceof HTMLElement) && !(htmlElement instanceof QueriedElement)) throw new Error('The given object is not a HTMLElement or QueriedElement or document object');
            if (htmlElement instanceof QueriedElement) this.htmlElement = htmlElement.toHtmlElement();
            else this.htmlElement = htmlElement;
            Object.assign(this, htmlElement);
            Object.freeze(this);
        }

        /**
         * @returns { HTMLElement } the managed HTMLElement
         */
        toHtmlElement() {
            return this.htmlElement;
        }

        /**
         * @param { Function } callback
         */
        ready(callback) {
            window.addEventListener('DOMContentLoaded', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        load(callback) {
            window.addEventListener('load', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        mouseover(callback) {
            this.on('mouseover', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        mouseleave(callback) {
            this.on('mouseleave', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        click(callback) {
            this.on('click', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        keyup(callback) {
            this.on('keyup', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        keydown(callback) {
            this.on('keydown', callback);
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         */
        on(event, callback) {
            this.htmlElement.addEventListener(event, callback);
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         */
        addEventListener(event, callback) {
            return this.on(event, callback);
        }

        /**
         * @param { String } className
         */
        removeClass(className) {
            this.htmlElement.classList.remove(className);
            return this;
        }

        /**
         * @param { String } className
         */
        addClass(className) {
            this.htmlElement.classList.add(className);
            return this;
        }

        /**
         * @param { String } className
         */
        toggleClass(className) {
            this.htmlElement.classList.toggle(className);
            return this;
        }

        /**
         * @param { String | Object } property
         * @param { String } value
         */
        css(property, value) {
            function addProperty(element, prop, val) {
                const camelProp = prop.replace(/(-[a-z])/, g => {
                    return g.replace('-', '').toUpperCase();
                });
                element.style[camelProp] = val;
            }
            if (typeof property === 'object' && property !== null) {
                Object.keys(property).forEach(cssProperty => {
                    addProperty(this.htmlElement, cssProperty, property[cssProperty]);
                });
                return this;
            }
            addProperty(this.htmlElement, property, value);
            return this;
        }

        /**
         * @param { String } attribute
         * @param { * } value
         */
        attr(attribute, value) {
            this.htmlElement.setAttribute(attribute, value);
            return this;
        }

        /**
         * @param { String } property
         * @param { * } value
         */
        prop(property, value) {
            this.htmlElement[property] = value;
            return this;
        }

        /**
         * @param { * } value
         */
        val(value) {
            return this.value(value);
        }

        /**
         * @param { * } value
         */
        value(value) {
            this.htmlElement.value = value;
            return this;
        }

        /**
         * @param { String } html
         */
        html(html) {
            this.htmlElement.innerHTML = html;
            return this;
        }

        /**
         * @param { String } text
         */
        text(text) {
            this.htmlElement.innerText = text;
            return this;
        }

        /**
         * @param { String } html
         */
        append(html) {
            this.htmlElement.innerHTML += html;
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         */
        hide(timeout = 0) {
            setTimeout(() => {
                this.show(timeout, 'none');
            }, timeout);
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         * @param { String } display default: "block"
         */
        show(timeout = 0, display = 'block') {
            setTimeout(() => {
                this.css('display', display);
            }, timeout);
            return this;
        }

        /**
         */
        select() {
            this.htmlElement.select();
            return this;
        }

        /**
         */
        focus() {
            this.htmlElement.focus();
            return this;
        }

        /**
         */
        selectAndFocus() {
            this.select();
            this.focus();
            return this;
        }

        /**
         */
        doNothing() {
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         */
        async wait(timeout) {
            var queried = this;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(queried);
                }, timeout);
            });
        }
    }

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.1 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    class QueriedElementCollection {
        /**
         * @param {QueriedElement | HTMLElement} elements
         */
        constructor(...elements) {
            this.length = 0;
            for (let i = 0; i < elements.length; i += 1) {
                this[i] = elements[i] instanceof QueriedElement ? elements[i] : new QueriedElement(elements[i]);
                this.length++;
            }
            Object.freeze(this);
        }

        /**
         * @param { Number } index
         * @returns { QueriedElement | Null }
         */
        get(index) {
            return this[index];
        }

        /**
         * @param { String } name the id or name of the element
         * @returns { QueriedElement | Null }
         */
        namedItem(name) {
            for (let i = 0; i < this.length; i++) {
                if (this[i].id === name || this[i].name === name) {
                    return this[i];
                }
            }
            return null;
        }

        /**
         * @param { Function } callback
         */
        each(callback) {
            if (callback && typeof callback === 'function') for (let i = 0; i < this.length; i++) callback(this[i]);
        }

        /**
         * @param { Function } callback
         */
        ready(callback) {
            window.addEventListener('DOMContentLoaded', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        load(callback) {
            window.addEventListener('load', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        mouseover(callbackFunction) {
            this.each(htmlElement => htmlElement.mouseover(callbackFunction));
            return this;
        }

        /**
         * @param { Function } callback
         */
        mouseleave(callbackFunction) {
            this.each(htmlElement => htmlElement.mouseleave(callbackFunction));
            return this;
        }

        /**
         * @param { Function } callback
         */
        click(callback) {
            this.on('click', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        keyup(callback) {
            this.on('keyup', callback);
            return this;
        }

        /**
         * @param { Function } callback
         */
        keydown(callback) {
            this.on('keydown', callback);
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         */
        on(event, callback) {
            this.each(htmlElement => htmlElement.on(event, callback));
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         */
        addEventListener(event, callback) {
            return this.on(event, callback);
        }

        /**
         * @param { String } className
         */
        removeClass(className) {
            this.each(htmlElement => htmlElement.removeClass(className));
            return this;
        }

        /**
         * @param { String } className
         */
        addClass(className) {
            this.each(htmlElement => htmlElement.addClass(className));
            return this;
        }

        /**
         * @param { String } className
         */
        toggleClass(className) {
            this.each(htmlElement => htmlElement.toggleClass(className));
            return this;
        }

        /**
         * @param { String | Object } property
         * @param { String } value
         */
        css(property, value) {
            this.each(htmlElement => htmlElement.css(property, value));
            return this;
        }

        /**
         * @param { String } attribute
         * @param { * } value
         */
        attr(attribute, value) {
            this.each(htmlElement => htmlElement.attr(attribute, value));
            return this;
        }

        /**
         * @param { String } property
         * @param { * } value
         */
        prop(property, value) {
            this.each(htmlElement => htmlElement.prop(property, value));
            return this;
        }

        /**
         * @param { * } value
         */
        val(value) {
            this.each(htmlElement => htmlElement.val(value));
            return this;
        }

        /**
         * @param { * } value
         */
        value(value) {
            this.each(htmlElement => htmlElement.value(value));
            return this;
        }

        /**
         * @param { String } html
         */
        html(html) {
            this.each(htmlElement => htmlElement.html(html));
            return this;
        }

        /**
         * @param { String } text
         */
        text(text) {
            this.each(htmlElement => htmlElement.text(text));
            return this;
        }

        /**
         * @param { String } html
         */
        append(html) {
            this.each(htmlElement => htmlElement.append(html));
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         */
        hide(timeout = 0) {
            setTimeout(() => {
                this.show(timeout, 'none');
            }, timeout);
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         * @param { String } display default: "block"
         */
        show(timeout = 0, display = 'block') {
            setTimeout(() => {
                this.css('display', display);
            }, timeout);
            return this;
        }

        /**
         */
        select() {
            this.each(htmlElement => htmlElement.select());
            return this;
        }

        /**
         */
        focus() {
            this.each(htmlElement => htmlElement.focus());
            return this;
        }

        /**
         */
        selectAndFocus() {
            this.select();
            this.focus();
            return this;
        }

        /**
         */
        doNothing() {
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         */
        async wait(timeout) {
            var coll = this;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(coll);
                }, timeout);
            });
        }
    }

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.1 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    // checking for some global scopes ( hQuery needs a window and document object )
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof window.document === 'undefined')
        throw new Error(`Missing scopes...  'window': ${typeof window !== 'undefined'} , 'window.document':  ${typeof window.document !== 'undefined'}, 'document':  ${typeof document !== 'undefined'}`);

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

    window['$'] = hQuery;
    window['hQuery'] = hQuery;
    return hQuery;
});
