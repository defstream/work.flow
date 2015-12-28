/*jslint node: true */
/*global module, require*/
'use strict';

var ValidationError = require('../error/validation');

module.exports = function addPath(path, callback) {
  if (!this.valid(path)) {
    return callback && callback(new ValidationError(
      'Path must be an object with a uri.'));
  }

  if (this.exists(path.uri)) {
    return callback && callback(new ValidationError(
      'A task with this uri has already been defined: ' + path.uri +
      '.'));
  }

  this.paths[path.uri] = path;

  return callback && callback(null, this.paths[path.uri]);
};
