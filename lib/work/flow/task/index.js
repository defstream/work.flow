/*jslint node: true */
/*global module, require*/
'use strict';
var utils = require('../../../utils');

var schema = require('./schema');

module.exports = function(options, callback) {
  if (utils.check(options).against(schema).using(callback).failed) return;

  return callback && callback(null);
};
