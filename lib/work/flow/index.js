/*jslint node: true */
/*global module, require*/
'use strict';

var flow = {
  task: {

  },
  path: {

  },
  run: require('./run'),
  definition: require('./definition'),
  definitions: require('./definitions')
};

flow.task.definition = require('./task/definition').bind(flow);
flow.path.definition = require('./path/definition').bind(flow);

module.exports = flow;
