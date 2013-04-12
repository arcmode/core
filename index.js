
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

/*
 * Private
 */

var status = 'uninitialized';

/**
 * @method joinEvents
 * @description 
 *   Adopt events from parent.
 * 
 * @api private
 */
var joinEvents = function(hosted, host) {
  if (host && host.hasOwnProperty('events')) {
    hosted.events = host.events;
  }
  return hosted;
};

/**
 * @constructor Core
 */

var Core = function() {
  this.modules = {};
};

/*
 * Inherit from Emiiter
 */

Core.prototype.events = new Emitter();

/**
 * @method status
 * @description 
 *   Get the status. Possible values: `uninitialized`, `running` and `stopped`.
 * 
 * @return {String} the status
 * @api public
 */

Core.prototype.status = function(){
  return status;
};

/**
 * @method changeStatus
 * @description 
 *   Change the status of this and each module.
 * 
 * @return {Core} this for chaining
 * @api public
 */

Core.prototype.changeStatus = function(options){
  if (this.status() === options.when) {
    var modules = this.modules;
    for (var module in modules) {
      var mod = modules[module];
      mod[options.perform](this);
    };
    status = options.success;
    this.events.emit('change status', options);
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

Core.prototype.init = function(parent){
  joinEvents(this, parent);
  var options = {
    when: 'uninitialized',
    perform: 'init',
    success: 'running',
    fail: 'Initialization can be performed only on uninitialized'
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
  joinEvents(this, parent);
  var options = {
    when: 'running',
    perform: 'stop',
    success: 'stopped',
    fail: 'Stop can be performed only on running'
  };
  this.changeStatus(options);
};

/**
 * @method resume
 * @description 
 *   Call the resume method on each module.
 * 
 * @return {Core} this for chaining
 * @api public
 */

Core.prototype.resume = function(){
  joinEvents(this, parent);
  var options = {
    when: 'stopped',
    perform: 'resume',
    success: 'running',
    fail: 'Resume can be performed only on stopped'
  };
  this.changeStatus(options);
};

/**
 * @method use
 * @description 
 *   Push a `module` to `this.modules`.
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
