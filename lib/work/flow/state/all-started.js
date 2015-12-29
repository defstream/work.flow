/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function validate(names) {
  return names.every(this.hasBegun.bind(this));
};
