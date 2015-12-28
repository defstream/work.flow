/*jslint node: true */
/*global module, require*/
'use strict';

var utils = require('../../../utils');
var schema = require('./schema');

module.exports = function definition(workdef, callback) {
  if (utils.check(workdef).against(schema).using(callback).failed) return;
  return this.definitions.addWorkflow(workdef, callback);
};
