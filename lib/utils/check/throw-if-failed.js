/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function throwIfFailed() {
  if (this.err) {
    throw this.err;
  }
  return this.err;
};
