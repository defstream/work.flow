/*jslint node: true */
/*global module, require*/
'use strict';

var read = require('./read');

module.exports = function tokenizer(values, token) {
  var stack = token.split('.');
  var value = read(stack, this.state);
  if (value !== undefined) {
    values[token] = value;
  }

  return values;
};
