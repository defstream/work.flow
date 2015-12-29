/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function completed(names) {
  return names.every(this.hasFinished.bind(this));
};
