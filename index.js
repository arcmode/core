/**
 * Core
 * Use and initialize objects with init function property.
 * 
 * @copyright 2013 David Rojas
 * @license MIT
 */

'use strict';

module.exports = Core;
var instance = null;

/**
 * @constructor Core
 */
var Core = function() {
  this.modules = [];
};

/**
 * @method init
 * @description 
 *   Call the init method of each `this.modules`.
 * 
 * @return {Core} this for chaining
 * @api public
 */
Core.prototype.init = function(){
  for (var i = modules.length - 1; i >= 0; i--){
    modules[i].init();
  };
  return this;
};

/**
 * @method use
 * @description 
 *   Push a `module` to `this.modules`.
 * 
 * @return {Core} this for chaining
 * @api public
 */
Core.prototype.use = function(module){
  this.modules.push(module);
  return this;
};

/**
 * @method instance
 * @description 
 *   Get the `Core` single instance.
 * 
 * @return {Core} the single instance
 * @api public
 */
Core.prototype.instance = function(){
  if (! instance) {
    instance = new Core();
  }
  return instance;
};

