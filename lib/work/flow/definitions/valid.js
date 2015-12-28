/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function valid(item) {
  if (item && item.uri && item.uri.toString().trim()) return true;
  return false;
};
