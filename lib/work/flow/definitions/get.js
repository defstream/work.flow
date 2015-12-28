/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function get(uri) {
  if (!uri) {
    return undefined;
  }
  return this.tasks[uri] || this.paths[uri] || this.workflows[uri];
};
