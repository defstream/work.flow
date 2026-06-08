'use strict';

import Joi from 'joi';
import ValidationError = require('../../work/flow/error/validation');

function validate(object: unknown, schema?: Joi.Schema): InstanceType<typeof ValidationError> | null {
  if (!schema) return null;
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    return new ValidationError('Validation failed', error);
  }
  return null;
}

export = validate;
