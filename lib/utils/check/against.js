/*jslint node: true */
/*global module, require, Object*/
'use strict';

var using = require('./using');
var validate = require('./validate');
var throwIfFailed = require('./throw-if-failed');

module.exports = function against(schema) {

  var validation = {};
  var err = validate(this.object, schema);

  Object.defineProperty(validation, 'using', {
    value: using.bind({
      err: err
    })
  });

  Object.defineProperty(validation, 'throwIfFailed', {
    value: throwIfFailed.bind({
      err: err
    })
  });

  return validation;
};
