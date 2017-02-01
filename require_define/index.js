const assert = require('assert');

function define(moduleName, fn) {
  define[moduleName] = fn;
}

function require_2(moduleName) {
  if(define[moduleName]) {
    return define[moduleName];
  } else {
    throw new Error('Module does not exist.');
  }
}

define('sum', (a, b) => a + b);
define('multiply', (a, b) => a * b);

const sum = require_2('sum');
const multiply = require_2('multiply');

assert.strictEqual(sum(2, 2), 4);
assert.strictEqual(multiply(12, 10), 120);