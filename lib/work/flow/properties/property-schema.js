/*jslint node: true */
/*global module, require*/
'use strict';

var Joi = require('joi');

module.exports = Joi.object().keys({
  value: Joi.any().optional(),
  type: [Joi.string(), Joi.func()],
  readOnly: Joi.boolean().optional()
});
