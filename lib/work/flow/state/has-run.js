/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function run(name) {
  return (this.state.started[name] || this.state.completed[name]) !==
    undefined;
};
