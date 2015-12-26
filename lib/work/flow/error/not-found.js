/*jslint node: true */
/*global module, require*/
'use strict';

var util = require('util');

module.exports = function NotFoundError(message, details) {
  Error.captureStackTrace(this, this.constructor);
  this.code = 404;
  this.name = this.constructor.name;
  this.message = message;
  this.details = details;
};

util.inherits(module.exports, Error);
