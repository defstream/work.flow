'use strict';

import Joi from 'joi';

export = Joi.object().keys({
  name: Joi.string().trim().required().description(
    'name is required and must be non empty string'
  ),
  properties: Joi.object().optional().description('properties must be an object'),
  status: Joi.string().valid('created', 'started', 'completed').optional(),
  value: Joi.any(),
  error: Joi.any(),
});
