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

import QueriedElement from './QueriedElement.js';

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
     * @param { Event } event
     * @param { Function } callback
     */
    on(event, callbackFunctionOrSelector, callbackFunction) {
        this.each(htmlElement => htmlElement.on(event, callbackFunctionOrSelector, callbackFunction));
        return this;
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

export default QueriedElementCollection;
