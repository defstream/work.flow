/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function notify(name, callback) {
  for (var i = 0; i < this.listeners.length; i++) {
    this.listeners[i](name);
  }
  return callback && callback(null);
};
