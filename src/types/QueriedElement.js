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
        this.htmlElement.on('mouseover', callback);
        return this;
    }

    /**
     * @param { Function } callback
     */
    mouseleave(callback) {
        this.htmlElement.on('mouseleave', callback);
        return this;
    }

    /**
     * @param { Event } event
     * @param { Function } callback
     */
    on(event, callback) {
        this.htmlElement.addEventListener(event, callback);
        return this;
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

export default QueriedElement;
