/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function exists(uri) {
  return this.get(uri) !== undefined;
};
