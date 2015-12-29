/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function removeListener(listener) {
  var index = this.listeners.indexOf(listener);
  if (index > -1) {
    this.listeners.splice(index, 1);
  }
};
