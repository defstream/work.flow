'use strict';

import Joi from 'joi';

export = Joi.object().keys({
  value: Joi.any().optional(),
  type: Joi.alternatives().try(Joi.string(), Joi.function()),
  readOnly: Joi.boolean().optional(),
});
