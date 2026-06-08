'use strict';

import Joi from 'joi';
import validate = require('./validate');

type AnyCallback = (err: Error, ...args: unknown[]) => unknown;

interface CheckResult {
  failed: boolean;
}

interface AgainstResult {
  using(callback?: AnyCallback): CheckResult;
  throwIfFailed(): null;
}

function against(this: { object: unknown }, schema?: Joi.Schema): AgainstResult {
  const err = validate(this.object, schema);

  return {
    using(callback?: AnyCallback): CheckResult {
      const result: CheckResult = { failed: err != null };
      if (result.failed && err) {
        if (!callback) throw err;
        callback(err);
      }
      return result;
    },
    throwIfFailed(): null {
      if (err) throw err;
      return null;
    },
  };
}

export = against;
