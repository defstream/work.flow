'use strict';

import Joi from 'joi';

export = Joi.object().keys({
  properties: Joi.object().required(),
  value: Joi.any().optional(),
}).required();
