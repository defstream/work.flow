/*jslint node: true */
/*global module, require*/
'use strict';

var utils = require('../../../utils');
var schema = require('./schema');

var Workflow = {

};

module.exports = function definition(options) {
  utils.check(options).against(schema).throwIfFailed();
  return Object.create(Workflow);
};
