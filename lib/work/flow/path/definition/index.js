/*jslint node: true */
/*global module, require*/
'use strict';

var utils = require('../../../../utils');
var schema = require('./schema');

var Path = {

};

module.exports = function definition(options) {
  utils.check(options).against(schema).throwIfFailed();
  return Object.create(Path);
};
