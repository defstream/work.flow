/*jslint node: true */
/*global module, require*/
'use strict';

var TimeoutError = require('../error/timeout');

module.exports = function listen(options, callback) {
  var timedout = false;
  var names = options.names.slice();

  var listener = function _listener(name) {
    if (timedout)
      return;
    var index = names.indexOf(name);
    if (index > -1) {
      names.splice(index, 1);
    }
    if (names.length === 0) {
      this.removeListener(listener);
      return callback && callback(null);
    }
  }.bind(this);

  var timeout = parseInt(options.timeout);

  if (!Number.isNaN(timeout)) {
    setTimeout(function timeout() {
      timedout = true;
      this.removeListener(listener);
      return callback && callback(new TimeoutError(
        'Execution exceeded timeout of ' + options.timeout +
        'ms.'));
    }.bind(this), timeout);
  }

  this.listeners.push(listener);

  return listener;
};
