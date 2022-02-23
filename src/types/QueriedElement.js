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

export default QueriedElement;
