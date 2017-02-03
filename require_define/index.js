/**
* Usage:
*
* Requires Node v6.x or higher.
*
* Within the terminal, navigate to the directory where this file is and run - node index.js.
*/

const assert = require('assert');

/**
* Store modules to be referenced in the future by require_2.
* @param {string} moduleName - The name of the module.
* @param {function} fn - The function to be stored.
* @return {object} The object storing the modules.  Only returns if the fn param was not passed in.
*/
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


/**
* Reference modules stored in the define function.
* @param {string} moduleName - The name of the module.
*/
function require_2(moduleName) {
  if(define(moduleName)[moduleName]) {
    return define(moduleName)[moduleName];
  } else {
    throw new Error('Module does not exist.');
  }
}


/**
* Assertions
*/
define('sum', (a, b) => a + b);
define('subtract', (a, b) => a - b);
define('multiply', (a, b) => a * b);

const sum = require_2('sum');
const multiply = require_2('multiply');
const subtract = require_2('subtract');

assert.strictEqual(sum(2, 2), 4);
assert.strictEqual(multiply(12, 12), 144);
assert.strictEqual(subtract(2, 2), 0);