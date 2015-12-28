/*jslint node: true */
/*global module, require*/
'use strict';

var utils = require('../../../../utils');
var schema = require('./schema');

module.exports = function definition(pathdef, callback) {
  if (utils.check(pathdef).against(schema).using(callback).failed) return;
  return this.definitions.addPath(pathdef, callback);
};
