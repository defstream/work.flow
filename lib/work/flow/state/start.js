/*jslint node: true */
/*global module, require*/
'use strict';

var ExecutionError = require('../error/execution');

module.exports = function start(name, callback) {
  if (this.hasRun(name)) {
    return callback && callback(new ExecutionError(
      'An item with this name has already started.'));
  }
  this.state.started[name] = true;
  return callback && callback(null);
};
