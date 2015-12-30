/*jslint node: true */
/*global module, require*/
'use strict';

var ExecutionError = require('../error/execution');

module.exports = function complete(name, value, callback) {
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
  this.state.completed[name] = {
    value: value
  };
  return this.notify(name, callback);
};
