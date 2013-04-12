
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
  this.modules = {};
  this.status = 'stopped';
};

/*
 * Inherit from Emitter
 */

Core.prototype.events = new Emitter();


/**
 * @method changeStatus
 * @description 
 *   Change the status of this and each module.
 * 
 * @return {Core} this for chaining
 * @api public
 */

Core.prototype.changeStatus = function(options){
  if (this.status === options.when) {
    var modules = this.modules;
    for (var module in modules) {
      var mod = modules[module];
      mod[options.perform]();
    };
    this.status = options.success;
    this.events.emit('change status', {
      target: this,
      data: options
    });
    return this;
  }
  throw new Error(options.fail);
};

/**
 * @method init
 * @description 
 *   Call the init method on each module.
 * 
 * @return {Core} this for chaining
 * @api public
 */

Core.prototype.init = function(){
  var options = {
    when: 'stopped',
    perform: 'init',
    success: 'running',
    fail: 'Initialization can be performed only on stopped'
  };
  this.changeStatus(options);
};

/**
 * @method stop
 * @description 
 *   Call the stop method on each module.
 * 
 * @return {Core} this for chaining
 * @api public
 */

Core.prototype.stop = function(){
  var options = {
    when: 'running',
    perform: 'stop',
    success: 'stopped',
    fail: 'Stop can be performed only on running'
  };
  this.changeStatus(options);
};

/**
 * @method use
 * @description 
 *   Add a `module` to `this.modules`.
 * 
 * @return {Core} this for chaining
 * @api public
 */

Core.prototype.use = function(id, module){
  this.modules[id] = module;
  return this;
};

/**
 * @method create
 * @description 
 *   Create a `Core`.
 * 
 * @return {Core} new `Core`
 * @api public
 */

Core.create = function(module){
  return new this();
};

/*
 * Expose `Core`
 */

module.exports = Core;
