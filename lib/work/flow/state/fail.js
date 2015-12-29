/*jslint node: true */
/*global module, require*/
'use strict';

var ExecutionError = require('../error/execution');

module.exports = function fail(name, callback) {
  if (!this.hasBegun(name)) {
    return callback && callback(new ExecutionError(
      'An item with this name has not yet started.'));
  }
  if (this.hasFinished(name)) {
    return callback && callback(new ExecutionError(
      'An item with this name has already completed.'));
  }
  this.state.completed[name] = true;
  return callback && callback(null);
};
