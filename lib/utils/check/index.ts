'use strict';

import Joi from 'joi';
import against = require('./against');

type AnyCallback = (err: Error, ...args: unknown[]) => unknown;

interface CheckResult {
  failed: boolean;
}

interface CheckChain {
  against(schema?: Joi.Schema): {
    using(callback?: AnyCallback): CheckResult;
    throwIfFailed(): null;
  };
}

function check(obj?: unknown): CheckChain {
  return {
    against: against.bind({ object: obj }),
  };
}

export = check;
