/*jslint node: true */
/*global module, require*/
'use strict';

var Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().trim().required().description(
    'name is required and must be non empty string'
  ),
  properties: Joi.object().optional().description(
    'properties must be an object'
  ),
  status: Joi.string().any().valid('created', 'started', 'completed'),
  value: Joi.any(),
  error: Joi.any()
});
