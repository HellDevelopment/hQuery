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

import hQuery from '../hQuery.js';

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

export default Alert;
