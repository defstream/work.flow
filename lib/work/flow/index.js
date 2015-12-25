/*jslint node: true */
/*global module, require*/
'use strict';

var run = require('./run');
var definitions = require('./definitions');
var taskDefinition = require('./task/definition');
var pathDefinition = require('./path/definition');
var workflowDefinition = require('./definition');

var flow = {
  task: {

  },
  path: {

  }
};

Object.defineProperty(flow, 'definitions', {
  value: definitions
});

Object.defineProperty(flow.task, 'definition', {
  value: taskDefinition.bind(flow)
});

Object.defineProperty(flow.path, 'definition', {
  value: pathDefinition.bind(flow)
});

Object.defineProperty(flow, 'definition', {
  value: workflowDefinition.bind(flow)
});

Object.defineProperty(flow, 'run', {
  value: run.bind(flow)
});

module.exports = flow;
