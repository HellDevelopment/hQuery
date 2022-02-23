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

import QueriedElement from './QueriedElement.js';

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

export default QueriedElementCollection;
