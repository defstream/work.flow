'use strict';

import Joi from 'joi';

export = Joi.object().keys({
  properties: Joi.object().required().description('properties are a required option'),
  value: Joi.any().optional(),
  state: Joi.object().required().description('state is a required option'),
}).required();
