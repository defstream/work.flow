/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function begun(name) {
  return this.state.started[name] !== undefined;
};
