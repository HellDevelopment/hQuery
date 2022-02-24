import hQuery from '../../src/hQuery.js';

QUnit.test('Basic requirements', (assert) => {
    assert.expect(15);
    assert.ok(Array.prototype.push, 'Array.push()');
    assert.ok(Array.prototype.map, 'Array.map()');
    assert.ok(Array.prototype.filter, 'Array.filter()');
    assert.ok(Array.prototype.reduce, 'Array.reduce()');
    assert.ok(Array.prototype.some, 'Array.some()');
    assert.ok(Array.isArray, 'Array.isArray()');
    assert.ok(Function.prototype.apply, 'Function.apply()');
    assert.ok(window.addEventListener, 'window.addEventListener');
    assert.ok(document.getElementById, 'document.getElementById');
    assert.ok(document.getElementsByTagName, 'document.getElementsByTagName');
    assert.ok(document.querySelector, 'document.querySelector');
    assert.ok(document.querySelectorAll, 'document.querySelectorAll');
    assert.ok(RegExp, 'RegExp');
    assert.ok(Object, 'Object');
    assert.ok(hQuery, 'hQuery');
});

QUnit.module('hQuery()', function () {
    QUnit.test('query empty elements throws exception', (assert) => {
        assert.expect(2);
        assert.throws(() => hQuery(''), 'hQuery("") has thrown exception');
        assert.throws(() => hQuery(), 'hQuery() has thrown exception');
    });

    QUnit.test('call functions', (assert) => {
        assert.expect(2);
        assert.ok(
            hQuery(document).ready(async () => {
                console.log(' f1 ');
            }),
            'hQuery(document).ready(() => {}) has been called'
        );

        assert.ok(
            hQuery(async () => {
                console.log(' f2 ');
            }),
            'hQuery(() => {}) has been called'
        );
    });

    QUnit.test("append body by div's and remove them", (assert) => {
        let len = 100;
        assert.expect(len);
        let arr = [];
        for (let i = 0; i < len / 2; i++) {
            let eluid = hQuery.randomUUID();
            let el = hQuery(`<div id="${eluid}"></div>`);
            assert.notOk(document.body.append(el.toHtmlElement()), 'adding element passed: ' + eluid);
            arr.push(el);
        }
        for (let el of arr) {
            assert.ok(el.toHtmlElement().parentElement.removeChild(el.toHtmlElement()), 'removing element passed: ' + el.toHtmlElement().id);
        }
    });
});

QUnit.module('hQuery.alert()', function () {
    QUnit.test('send Alert', (assert) => {
        assert.expect(5);
        assert.equal(hQuery.alert.info('info Alert', 'glassmorphism-dark') instanceof Promise, true, 'Alert');
        assert.equal(hQuery.alert.primary('primary Alert', 'glassmorphism-dark') instanceof Promise, true, 'Alert');
        assert.equal(hQuery.alert.error('error Alert', 'glassmorphism-dark') instanceof Promise, true, 'Alert');
        assert.equal(hQuery.alert.warning('warning Alert', 'glassmorphism-dark') instanceof Promise, true, 'Alert');
        assert.equal(hQuery.alert.success('success Alert', 'glassmorphism-dark') instanceof Promise, true, 'Alert');
    });
});
