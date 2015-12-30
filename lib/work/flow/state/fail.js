/*jslint node: true */
/*global module, require*/
'use strict';

var ExecutionError = require('../error/execution');

module.exports = function fail(name, value, callback) {
  if (typeof value === 'function') {
    callback = value;
    value = undefined;
  }

  if (!this.hasBegun(name)) {
    return callback && callback(new ExecutionError(
      'An item with this name has not yet started.'));
  }
  if (this.hasFinished(name)) {
    return callback && callback(new ExecutionError(
      'An item with this name has already completed.'));
  }
  this.state.completed[name] = true;

  this.state.completed[name] = {
    error: value
  };

  return callback && callback(null);
};
