/*jslint node: true */
/*global module, require*/
'use strict';

var TOKENS = /{([^{}]+)}/g;

module.exports = function tokens(text) {
  var match = text.match(TOKENS);
  if (!match) {
    return [];
  }
  return match.map(function(i) {
    return i.substring(1, i.length - 1);
  });
};
