/*jslint node: true */
/*global module, require*/
'use strict';

var utils = require('../../../../utils');
var schema = require('./schema');

module.exports = function definition(taskdef, callback) {
  if (utils.check(taskdef).against(schema).using(callback).failed) return;
  return this.definitions.addPath(taskdef, callback);
};
