/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = {
  tasks: {

  },
  workflows: {

  },
  paths: {

  },
  get: require('./get'),
  valid: require('./valid'),
  exists: require('./exists'),
  addTask: require('./add-task'),
  addPath: require('./add-path'),
  addWorkflow: require('./add-workflow')
};
