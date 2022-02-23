# hQuery - a lightweight JS-Framework

## hQuery is a lightweight and fast jQuery alternative for DOM manipulation

---

### CURRENTLY UNDER CONSTRUCTION

---

### Navigate Through

#### Contents

- [Import hQuery](#import-hquery)
- [Query Elements](#query-elements)

- [QueriedElement Methods](#queriedelement-methods)
- [QueriedElementCollection Methods](#queriedelementcollection-methods)

- [Shorthand Methods](#shorthand-methods)

- [hQuery Alerts](#hquery-alerts)

---

```js
/**
 * hQuery | Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
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
 */
```

---

#### Import hQuery

[Navigate Through](#navigate-through)

- Plain HTML import via cdn

```html
<script src="https://cdn.jsdelivr.net/npm/hquery.js@latest/dist/hQuery.min.js"></script>
```

- JSX / module import

> npm install hquery.js

```js
import $ from "hquery.js";
```

---

#### Query Elements

[Navigate Through](#navigate-through)

```js
// to get an element by a querySelector you can simply use 
$("elementSelector.classSelector#idSelector") // returns a QueriedElement

// if you simply add an "!" at the beginning you will get a collection of all QueriedElement's
$("!elementSelector.classSelector#idSelector") // returns a QueriedElementCollection
```

#### QueriedElement Methods

[Navigate Through](#navigate-through)

```js
// query to a queried element 
let qe = $('.classSelector');

// add / remove and toggle classes
$('.classSelector').addClass('className');
$('.classSelector').removeClass('className');
$('.classSelector').toggleClass('className'); // adds that class if its not existing // removes class if its existing

// manage styling
$('.classSelector').css('background', '#222');
$('.classSelector').css('height', '20px');
$('.classSelector').css('width', '60px');
// or
$('.classSelector').css({
    width: '60px',
    height: '60px',
    fontSize: '40px'
});

// hide and show element
$('.classSelector').show(/*optional*/ timeout, /*optional*/ 'block'); // sets css property display: block;
$('.classSelector').hide(/*optional*/ timeout); // sets css property display: none;

// wait Function
$('.classSelector')
    .wait(2000)
    .then((element) => {
        console.log('Waited for 2000ms');
    });

// add or remove properties from an element
$('.checkbox').prop('checked', true);
$('.checkbox').prop('checked', false);

// set element attributes
$('.tooltipped').attr('data-tooltip', 'This is a cool tool tipped element');

// change innerHTML of an element
$('.text').html(`<code><pre>Lala</pre></code>`);
// change innerText of an element
$('.text').text(`This a a cool new text`);
// append current innerHTML with new HTML
$('.text').append(`<code><pre>Lulu</pre></code>`);

// set a value of an element (maybe to copy text to clipboard)
$('.text').value(`https://lucifer-morningstar.xyz/`);

// select and focus element
$('.textField').select();
$('.textField').focus();
$('.textField').selectAndFocus();

```

#### QueriedElementCollection Methods

[Navigate Through](#navigate-through)

```js
// query to a queried element collection
let qec = $('!.classSelector');

// to get a specific element as a QueriedElement by given index
let index = 0;
let qe = qec.get(index);
// to get a specific element as a QueriedElement by name or id
let qe = qec.namedItem("idOrName");

// loop through a collection
$('!.classSelector').each(function (element) {
    console.log(element);
});

// add / remove and toggle classes at all queried elements
$('!.classSelector').addClass('className');
$('!.classSelector').removeClass('className');
$('!.classSelector').toggleClass('className'); // adds that class if its not existing // removes class if its existing

// manage styling
$('!.classSelector').css('background', '#222');
$('!.classSelector').css('height', '20px');
$('!.classSelector').css('width', '60px');
// or
$('! .classSelector').css({
    width: '60px',
    height: '60px',
    fontSize: '40px'
});

// hide and show elements
$('.classSelector').show(/*optional*/ timeout, /*optional*/ 'block'); // sets css property display: block;
$('.classSelector').hide(/*optional*/ timeout); // sets css property display: none;

// wait Function
$('!.classSelector')
    .wait(2000)
    .then((element) => {
        console.log('Waited for 2000ms');
    });

// add or remove properties from elements
$('!.checkbox').prop('checked', true);
$('!.checkbox').prop('checked', false);

// set element attributes
$('!.tooltipped').attr('data-tooltip', 'This is a cool tool tipped element');

// change innerHTML of elements
$('!.text').html(`<code><pre>Lala</pre></code>`);
// change innerText of elements
$('!.text').text(`This a a cool new text`);
// append current innerHTML with new HTML
$('!.text').append(`<code><pre>Lulu</pre></code>`);

// set values of elements (maybe to copy text to clipboard)
$('!.text').value(`https://lucifer-morningstar.xyz/`);

// select and focus elements
$('!.textField').select();
$('!.textField').focus();
$('!.textField').selectAndFocus();

```

#### Shorthand Methods

[Navigate Through](#navigate-through)

```js

// Utility 
$.isArray([1, 2, 3]); // returns true
$.isEmptyObject({}); // returns true
$.isPlainObject({ data: ['asdf'] }); // returns true
$.isFunction(function () {
    /****/
}); // returns true
$.isNotNull('This is a nice string :)'); // returns true
$.isNotNull(null); // returns false

// fetch and set JSON to an element
$.getJSON('https://example.com/json')
    .done((data) => {
        $('.text').html(`<code><pre>${JSON.stringify(data, null, 2).split('\n').join('<br>')}</pre></code>`);
        $('.text').show();
    })
    .always(() => console.log('This runs always no matter if failed or done'))
    .fail((error) => console.error);

// post FormData example
$.postFormData('https://example.com/formData', {
    text: 'TestPost',
})
    .done((response) => {
        console.log(response);
    })
    .always(() => console.log('POST Complete'))
    .fail((error) => console.error);


// returns the current value of "_myCookie" or null
let myCookie = $.cookie('_myCookie');

if (!myCookie) {
    // sets a cookie with the value of 0 for 1 day ( 24 hours )
    $.cookie('_myCookie', 0, 1);
} else {
    // sets a cookie with the value of myCookie + 1 or 1 if its not existing for 1 day ( 24 hours )
    $.cookie('_myCookie', (parseInt(myCookie) || 0) + 1, 1); 
}
// delete/invalidate a cookie ( set a new value and invalidate with a new time set to -1 days )
$.cookie('_myCookie', null, -1); 

```


#### hQuery Alerts

[Navigate Through](#navigate-through)

- import alerts css first

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hquery.js@latest/dist/styles/alert.min.css">
```

```js

import "hquery.js/dist/styles/alert.css";
import "hquery.js/src/scss/alert.scss";

// send closeable alert messages if they aren't closed by user they dismiss after 10 seconds... they're displayed at the bottom right of the page

// dark / light / glassmorphism-dark / glassmorphism-light
var theme = "dark"; // default is glassmorphism-light
// warning / success / info / primary / error
var kind = "primary"; // default is primary
$.alert(kind, "This is my nice message", "theme");
$.alert.info('This is a info alert', theme);
$.alert.success('This is a success alert', theme);
$.alert.warning('This is a warning alert', theme);
$.alert.error('This is a error alert', theme);
$.alert.primary('This is a primary alert', theme);

```
