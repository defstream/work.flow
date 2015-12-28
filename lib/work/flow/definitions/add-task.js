/*jslint node: true */
/*global module, require*/
'use strict';

var ValidationError = require('../error/validation');

module.exports = function addTask(task, callback) {
  if (!this.valid(task)) {
    return callback && callback(new ValidationError(
      'Task must be an object with a uri.'));
  }

  if (this.exists(task.uri)) {
    return callback && callback(new ValidationError(
      'This uri has already been defined: ' + task.uri +
      '.'));
  }

  this.tasks[task.uri] = task;

  return callback && callback(null, this.tasks[task.uri]);
};
