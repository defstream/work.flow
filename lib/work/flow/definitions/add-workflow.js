/*jslint node: true */
/*global module, require*/
'use strict';

var ValidationError = require('../error/validation');

module.exports = function addWorkflow(workflow, callback) {
  if (!this.valid(workflow)) {
    return callback && callback(new ValidationError(
      'Path must be an object with a uri.'));
  }

  if (this.exists(workflow.uri)) {
    return callback && callback(new ValidationError(
      'A task with this uri has already been defined: ' + workflow.uri +
      '.'));
  }

  this.workflows[workflow.uri] = workflow;

  return callback && callback(null, this.workflows[workflow.uri]);
};
