/*jslint node: true */
/*global module, require*/
'use strict';

var ExecutionError = require('../error/execution');

module.exports = function awaits(options, callback) {
  if (!options || !(options.names instanceof Array)) {
    return callback && callback(new ExecutionError(
      'Invalid arguments, options.names is required and expected to be a string array.'
    ));
  }

  if (!options.names.length || this.allCompleted(options.names) === true) {
    return callback && callback(null);
  }

  if (this.allStarted(options.names) === false) {
    return callback && callback(new ExecutionError(
      'Attempting await a name that has yet started.'));
  }

  return this.listen(options, callback);
};
