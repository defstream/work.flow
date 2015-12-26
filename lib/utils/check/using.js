/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function using(callback) {
  var result = {
    failed: this.err && true || false
  };
  if (result.failed) {
    if (!callback) {
      throw this.err;
    }
    return callback(this.err) && result || result;
  }
  return result;
};
