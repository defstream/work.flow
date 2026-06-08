'use strict';

import Joi from 'joi';

export = Joi.object().keys({
  name: Joi.string().description('name must be a valid string'),
  uri: Joi.string().required().description('uri must be a valid string'),
  properties: Joi.object().optional().description('properties must be an object'),
  error: Joi.array().items(Joi.string(), Joi.object()).optional().description(
    'error must be a valid array'
  ),
  timeout: Joi.number().min(0).optional().description('timeout must be a valid Number'),
});
