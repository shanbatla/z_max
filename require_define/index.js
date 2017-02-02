const assert = require('assert');

function define(moduleName, fn) {
  if(fn) {
    if(!this.modules) {
      this.modules = {};
    }
    this.modules[moduleName] = fn;
  } else {
    return this.modules;
  }
}

function require_2(moduleName) {
  if(define(moduleName)[moduleName]) {
    return define(moduleName)[moduleName];
  } else {
    throw new Error('Module does not exist.');
  }
}

define('sum', (a, b) => a + b);
define('subtract', (a, b) => a - b);
define('multiply', (a, b) => a * b);

const sum = require_2('sum');
const multiply = require_2('multiply');
const subtract = require_2('subtract');

assert.strictEqual(sum(2, 2), 4);
assert.strictEqual(multiply(12, 12), 144);
assert.strictEqual(subtract(2, 2), 0);