/*jslint node: true */
/*global module, require*/
'use strict';

var Joi = require('joi');

module.exports = Joi.object().keys({
  properties: Joi.object().required(),
  value: Joi.any().optional(),
}).required();
