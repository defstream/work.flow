'use strict';

import Joi from 'joi';

export = Joi.object().keys({
  name: Joi.string().description('name must be a valid string'),
  awaits: Joi.array().items(Joi.string()).optional().description(
    'awaits must be a valid array of strings.'
  ),
  properties: Joi.object().optional().description('properties must be an object'),
  context: Joi.object().optional().description('context must be an object'),
  timeout: Joi.number().min(0).optional().description('timeout must be a valid Number'),
  workflow: Joi.object().required().description('workflow must be an object'),
  definition: Joi.object().required().description('definition must be an object').keys({
    task: Joi.function().required().description('definition.task is a required function'),
  }),
});
