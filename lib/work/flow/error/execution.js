/*jslint node: true */
/*global module, require*/
'use strict';

var util = require('util');

module.exports = function ExecutionError(message, details) {
  Error.captureStackTrace(this, this.constructor);
  this.code = 500;
  this.name = this.constructor.name;
  this.message = message;
  this.details = details;
};

util.inherits(module.exports, Error);
