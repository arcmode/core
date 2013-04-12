/**
 * Core
 * Use and initialize objects with init function property.
 * 
 * @copyright 2013 David Rojas
 * @license MIT
 */

'use strict';

/*
 * Module dependencies
 */

var Emitter = require('emitter');

/**
 * @constructor Core
 */

var Core = function() {
  this.modules = [];
  this.events = new Emitter();
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
    modules[i].init(this);
  };
  this.events.emit('init');
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

/*
 * Expose `Core`
 */

module.exports = Core;
