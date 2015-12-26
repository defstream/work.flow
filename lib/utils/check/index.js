/*jslint node: true */
/*global module, require*/
'use strict';

var against = require('./against');

module.exports = function check(obj) {
  return {
    against: against.bind({
      object: obj
    })
  };
};
