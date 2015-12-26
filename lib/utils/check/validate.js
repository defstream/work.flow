/*jslint node: true */
/*global module, require*/


var Joi = require('joi');
var ValidationError = require('../../work/flow/error/validation');

module.exports = function validate(object, schema) {
  'use strict';
  var error = schema && Joi.validate(object, schema, {
    abortEarly: false
  }).error;

  if (error) {
    return new ValidationError('Validation failed', error);
  }
  return null;
};
