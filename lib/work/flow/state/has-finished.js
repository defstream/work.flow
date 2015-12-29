/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function finished(name) {
  return this.state.completed[name] !== undefined;
};
