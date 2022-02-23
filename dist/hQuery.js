/**
 *
 * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
 *
 * hQuery v0.0.5 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.5 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    var alertContainer = null;

    class Alert {
        /**
         * @param { String } type the type of the alert ( warning / success / info / primary / error )
         * @param { String } text the text to show in the alert ( Can be HTML too )
         */
        constructor(text = '', type = 'primary') {
            this.types = ['warning', 'success', 'info', 'primary', 'error'];
            this.themes = ['dark', 'light', 'glassmorphism-dark', 'glassmorphism-light'];
            if (!this.types.includes(type)) type = 'primary';
            this.text = text;
            this.type = type;
            this.uuid = hQuery.randomUUID();
        }

        getText() {
            return this.text;
        }

        getType() {
            return this.type;
        }

        /**
         * @param { String } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
         * @returns { Promise<Alert> }
         */
        async alert(theme = 'glassmorphism-light') {
            if (!this.themes.includes(theme)) theme = 'glassmorphism-light';
            return new Promise((resolve, reject) => {
                try {
                    if (!alertContainer) {
                        alertContainer = hQuery('<div class="hquery-alerts"></div>');
                        document.body.append(alertContainer.toHtmlElement());
                    }
                    let element = hQuery(`<div id="${this.uuid}" class="hquery-alert ${theme} ${this.type}"></div>`).html(`<p>${this.text}</p>`);
                    let close = hQuery(`<h4 id="${this.uuid}-close" class="close">&#x292B;</h4>`);
                    element.append(close.toHtmlElement());
                    alertContainer.toHtmlElement().append(element.toHtmlElement());
                    element.show(10, 'block');
                    var shown = true;
                    let removeElement = () => {
                        if (!shown) return;
                        element.hide();
                        element.toHtmlElement().parentElement.removeChild(element.toHtmlElement());
                        if (alertContainer.toHtmlElement().firstChild == null) {
                            alertContainer.toHtmlElement().parentElement.removeChild(alertContainer.toHtmlElement());
                            alertContainer = null;
                        }
                        shown = false;
                    };
                    close.on('click', removeElement);
                    setTimeout(removeElement, 10000);
                    return resolve(this);
                } catch (error) {
                    return reject(error);
                }
            });
        }
    }

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.5 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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

    /**
     *
     * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
     *
     * hQuery v0.0.5 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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
         * @returns { QueriedElement }
         */
        ready(callback) {
            window.addEventListener('DOMContentLoaded', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        load(callback) {
            window.addEventListener('load', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        mouseover(callback) {
            this.on('mouseover', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        mouseleave(callback) {
            this.on('mouseleave', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        click(callback) {
            this.on('click', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        keyup(callback) {
            this.on('keyup', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        keydown(callback) {
            this.on('keydown', callback);
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        on(event, callback) {
            this.htmlElement.addEventListener(event, callback);
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         * @returns { QueriedElement }
         */
        addEventListener(event, callback) {
            return this.on(event, callback);
        }

        /**
         * @param { String } className
         * @returns { QueriedElement }
         */
        removeClass(className) {
            this.htmlElement.classList.remove(className);
            return this;
        }

        /**
         * @param { String } className
         * @returns { QueriedElement }
         */
        addClass(className) {
            this.htmlElement.classList.add(className);
            return this;
        }

        /**
         * @param { String } className
         * @returns { QueriedElement }
         */
        toggleClass(className) {
            this.htmlElement.classList.toggle(className);
            return this;
        }

        /**
         * @param { String | Object } property
         * @param { String } value
         * @returns { QueriedElement }
         */
        css(property, value) {
            function addProperty(element, prop, val) {
                const camelProp = prop.replace(/(-[a-z])/, (g) => {
                    return g.replace('-', '').toUpperCase();
                });
                element.style[camelProp] = val;
            }
            if (typeof property === 'object' && property !== null) {
                Object.keys(property).forEach((cssProperty) => {
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
         * @returns { QueriedElement }
         */
        attr(attribute, value) {
            this.htmlElement.setAttribute(attribute, value);
            return this;
        }

        /**
         * @param { String } property
         * @param { * } value
         * @returns { QueriedElement }
         */
        prop(property, value) {
            this.htmlElement[property] = value;
            return this;
        }

        /**
         * @param { * } value
         * @returns { QueriedElement }
         */
        val(value) {
            return this.value(value);
        }

        /**
         * @param { * } value
         * @returns { QueriedElement }
         */
        value(value) {
            this.htmlElement.value = value;
            return this;
        }

        /**
         * @param { String } html
         * @returns { QueriedElement }
         */
        html(html) {
            this.htmlElement.innerHTML = html;
            return this;
        }

        /**
         * @param { String } text
         * @returns { QueriedElement }
         */
        text(text) {
            this.htmlElement.innerText = text;
            return this;
        }

        /**
         * @param { String | HTMLElement | QueriedElement } html
         * @returns { QueriedElement }
         */
        append(html) {
            if (html instanceof QueriedElement) {
                this.toHtmlElement().append(html.toHtmlElement());
                return this;
            }
            if (html instanceof HTMLElement) {
                this.toHtmlElement().append(html);
                return this;
            }
            this.htmlElement.innerHTML += html;
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         * @returns { QueriedElement }
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
         * @returns { QueriedElement }
         */
        show(timeout = 0, display = 'block') {
            setTimeout(() => {
                this.css('display', display);
            }, timeout);
            return this;
        }

        /**
         * @returns { QueriedElement }
         */
        select() {
            this.htmlElement.select();
            return this;
        }

        /**
         * @returns { QueriedElement }
         */
        focus() {
            this.htmlElement.focus();
            return this;
        }

        /**
         * @returns { QueriedElement }
         */
        selectAndFocus() {
            this.select();
            this.focus();
            return this;
        }

        /**
         * @returns { QueriedElement }
         */
        doNothing() {
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         * @returns { Promise<QueriedElement> }
         */
        async wait(timeout) {
            var queried = this;
            return new Promise((resolve) => {
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
     * hQuery v0.0.5 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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
         * @param {QueriedElement | HTMLElement | QueriedElementCollection } elements
         */
        constructor(...elements) {
            this.length = 0;
            for (let i = 0; i < elements.length; i += 1) {
                if (elements[i] instanceof QueriedElement) {
                    this[i] = elements[i];
                    this.length++;
                } else if (elements[i] instanceof QueriedElementCollection) {
                    elements[i].each((element) => {
                        this[i] = element;
                        this.length++;
                    });
                } else {
                    this[i] = new QueriedElement(elements[i]);
                    this.length++;
                }
            }
        }

        /**
         * @param { Number } index
         * @returns { QueriedElement | Null }
         */
        get(index) {
            return this[index] != null ? this[index] : null;
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
         * @returns { Array<QueriedElement> }
         */
        array() {
            let tmpArr = [];
            for (let i = 0; i < this.length; i++) {
                tmpArr.push(this[i]);
            }
            return tmpArr;
        }

        /**
         * @param { HTMLElement | QueriedElement | QueriedElementCollection } elements
         * @returns { QueriedElementCollection }
         */
        add(...elements) {
            let indexAdd = 0;
            elements.forEach((element) => {
                if (element instanceof QueriedElementCollection) {
                    for (let i = 0; i < element.length; i++) {
                        this[this.length + indexAdd] = element[i];
                        indexAdd++;
                    }
                } else if (element instanceof QueriedElement) {
                    this[this.length + indexAdd] = element;
                    indexAdd++;
                } else {
                    this[this.length + indexAdd] = new QueriedElement(element);
                    indexAdd++;
                }
            });
            this.length += indexAdd;
            return this;
        }

        /**
         * @param { QueriedElement } elements
         * @returns { QueriedElementCollection }
         */
        remove(...elements) {
            var tmpElements = this.array();
            for (let i = 0; i < this.length; i++) {
                delete this[i];
            }
            elements.forEach((el) => {
                tmpElements.remove(el);
            });
            let index = 0;
            tmpElements.forEach((element) => {
                if (element != null) {
                    this[index] = element;
                    index++;
                }
            });
            this.length = this[0] != null ? index + 1 : 0;
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        map(callback) {
            return new QueriedElementCollection(...this.array().map(callback));
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        filter(callback) {
            return new QueriedElementCollection(...this.array().filter(callback));
        }

        /**
         * @param { Function } callback
         * @param { * } thisArg
         * @returns { QueriedElementCollection }
         */
        some(callback, thisArg) {
            return new QueriedElementCollection(...this.array().some(callback, thisArg));
        }

        /**
         * @param { Function } callback
         * @param { * } initialValue
         * @returns { QueriedElementCollection }
         */
        reduce(callback, initialValue = 0) {
            return new QueriedElementCollection(...this.array().reduce(callback, initialValue));
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        ready(callback) {
            window.addEventListener('DOMContentLoaded', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        load(callback) {
            window.addEventListener('load', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        mouseover(callbackFunction) {
            this.each((htmlElement) => htmlElement.mouseover(callbackFunction));
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        mouseleave(callbackFunction) {
            this.each((htmlElement) => htmlElement.mouseleave(callbackFunction));
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        click(callback) {
            this.on('click', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        keyup(callback) {
            this.on('keyup', callback);
            return this;
        }

        /**
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        keydown(callback) {
            this.on('keydown', callback);
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        on(event, callback) {
            this.each((htmlElement) => htmlElement.on(event, callback));
            return this;
        }

        /**
         * @param { String } event
         * @param { Function } callback
         * @returns { QueriedElementCollection }
         */
        addEventListener(event, callback) {
            return this.on(event, callback);
        }

        /**
         * @param { String } className
         * @returns { QueriedElementCollection }
         */
        removeClass(className) {
            this.each((htmlElement) => htmlElement.removeClass(className));
            return this;
        }

        /**
         * @param { String } className
         * @returns { QueriedElementCollection }
         */
        addClass(className) {
            this.each((htmlElement) => htmlElement.addClass(className));
            return this;
        }

        /**
         * @param { String } className
         * @returns { QueriedElementCollection }
         */
        toggleClass(className) {
            this.each((htmlElement) => htmlElement.toggleClass(className));
            return this;
        }

        /**
         * @param { String | Object } property
         * @param { String } value
         * @returns { QueriedElementCollection }
         */
        css(property, value) {
            this.each((htmlElement) => htmlElement.css(property, value));
            return this;
        }

        /**
         * @param { String } attribute
         * @param { * } value
         * @returns { QueriedElementCollection }
         */
        attr(attribute, value) {
            this.each((htmlElement) => htmlElement.attr(attribute, value));
            return this;
        }

        /**
         * @param { String } property
         * @param { * } value
         * @returns { QueriedElementCollection }
         */
        prop(property, value) {
            this.each((htmlElement) => htmlElement.prop(property, value));
            return this;
        }

        /**
         * @param { * } value
         * @returns { QueriedElementCollection }
         */
        val(value) {
            this.each((htmlElement) => htmlElement.val(value));
            return this;
        }

        /**
         * @param { * } value
         * @returns { QueriedElementCollection }
         */
        value(value) {
            this.each((htmlElement) => htmlElement.value(value));
            return this;
        }

        /**
         * @param { String } html
         * @returns { QueriedElementCollection }
         */
        html(html) {
            this.each((htmlElement) => htmlElement.html(html));
            return this;
        }

        /**
         * @param { String } text
         * @returns { QueriedElementCollection }
         */
        text(text) {
            this.each((htmlElement) => htmlElement.text(text));
            return this;
        }

        /**
         * @param { String | HTMLElement | QueriedElement } html
         * @returns { QueriedElementCollection }
         */
        append(html) {
            this.each((htmlElement) => htmlElement.append(html));
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         * @returns { QueriedElementCollection }
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
         * @returns { QueriedElementCollection }
         */
        show(timeout = 0, display = 'block') {
            setTimeout(() => {
                this.css('display', display);
            }, timeout);
            return this;
        }

        /**
         * @returns { QueriedElementCollection }
         */
        select() {
            this.each((htmlElement) => htmlElement.select());
            return this;
        }

        /**
         * @returns { QueriedElementCollection }
         */
        focus() {
            this.each((htmlElement) => htmlElement.focus());
            return this;
        }

        /**
         * @returns { QueriedElementCollection }
         */
        selectAndFocus() {
            this.select();
            this.focus();
            return this;
        }

        /**
         * @returns { QueriedElementCollection }
         */
        doNothing() {
            return this;
        }

        /**
         * @param { Number } timeout in milliseconds
         * @returns { Promise<QueriedElementCollection> }
         */
        async wait(timeout) {
            var queried = this;
            return new Promise((resolve) => {
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
     * hQuery v0.0.5 | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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
            return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1) && htmlRegex.test(input);
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
                var tmpDiv = document.createElement('div');
                tmpDiv.innerHTML = selector;
                return new QueriedElement(tmpDiv.firstChild);
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
    hQuery.isEmptyObject = (check) => typeof check === 'object' && check !== null && Object.keys(check).length <= 0;

    /**
     * @param {*} check
     * @returns { Boolean } if the given to check variable is a plain object ( To check if its empty use hQuery.isEmptyObject(check) )
     */
    hQuery.isPlainObject = (check) => typeof check === 'object';

    /**
     * @param {*} check
     * @returns { Boolean } if the given to check variable is an array
     */
    hQuery.isArray = (check) => Array.isArray(check);

    /**
     * @param {*} check
     * @returns { Boolean } if the given to check variable is a function
     */
    hQuery.isFunction = (check) => typeof check === 'function';

    /**
     * @param {*} check
     * @returns { Boolean } if the given to check variable is not null (check !== null && check !== undefined)
     */
    hQuery.isNotNull = (check) => check !== null && check !== undefined;

    /**
     * @returns  { String } uuid in format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     */
    hQuery.randomUUID = () => {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
    };

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
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Status Error: ' + res.status);
                    }
                })
                .then((data) => {
                    success(data);
                    return data;
                })
                .catch((error) => {
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
                .then((response) => {
                    success(response);
                    return response;
                })
                .catch((error) => {
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
                .then((response) => {
                    success(response);
                    return response;
                })
                .catch((error) => {
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
                Object.keys(object).forEach((key) => formData.append(key, object[key]));
                return formData;
            }
            formData = getFormData(formData);
        }
        options.method = 'POST';
        options['Content-Type'] = 'application/x-www-form-urlencoded';
        options.body = formData;
        return new AjaxPromise(
            fetch(url, options)
                .then((response) => {
                    success(response);
                    return response;
                })
                .catch((error) => {
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

    /**
     * @param { String } type the type of the alert ( warning / success / info / primary / error )
     * @param { String } text the text to show in the alert ( Can be HTML too )
     * @param { String } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
     * @returns { Promise<Alert> } a promise with the alert instance
     */
    hQuery.alert = (type, text, theme) => {
        let alert = new Alert(text, type);
        return alert.alert(theme);
    };

    /**
     * @param { String } text the text to show in the alert ( Can be HTML too )
     * @param { String | Null } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
     * @returns { Promise<Alert> } a promise with the alert instance
     */
    hQuery.alert.success = (text, theme) => {
        return hQuery.alert('success', text, theme);
    };

    /**
     * @param { String } text the text to show in the alert ( Can be HTML too )
     * @param { String | Null } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
     * @returns { Promise<Alert> } a promise with the alert instance
     */
    hQuery.alert.warning = (text, theme) => {
        return hQuery.alert('warning', text, theme);
    };

    /**
     * @param { String } text the text to show in the alert ( Can be HTML too )
     * @param { String | Null } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
     * @returns { Promise<Alert> } a promise with the alert instance
     */
    hQuery.alert.primary = (text, theme) => {
        return hQuery.alert('primary', text, theme);
    };

    /**
     * @param { String } text the text to show in the alert ( Can be HTML too )
     * @param { String | Null } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
     * @returns { Promise<Alert> } a promise with the alert instance
     */
    hQuery.alert.error = (text, theme) => {
        return hQuery.alert('error', text, theme);
    };

    /**
     * @param { String } text the text to show in the alert ( Can be HTML too )
     * @param { String | Null } theme the theme of the alert ( dark / light / glassmorphism-dark / glassmorphism-light )
     * @returns { Promise<Alert> } a promise with the alert instance
     */
    hQuery.alert.info = (text, theme) => {
        return hQuery.alert('info', text, theme);
    };

    window['$'] = hQuery;
    window['hQuery'] = hQuery;
    return hQuery;
});
