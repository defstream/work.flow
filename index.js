/*jslint node: true */
/*global module, require*/
'use strict';

/** @exports Workflow **/
var Workflow = {
  flow: require('./lib/work/flow')
};
/**
 * creates an instance of a new Workflow.
 * @param  {Object} options The options for this workflow
 */
module.exports = function createWorkflow(options) {
  return Object.create(Workflow);
};
