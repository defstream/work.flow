'use strict';

type AnyCallback = (err: Error, ...args: unknown[]) => unknown;

interface CheckResult {
  failed: boolean;
}

function using(this: { err: Error | null }, callback?: AnyCallback): CheckResult {
  const result: CheckResult = { failed: this.err != null };

  if (result.failed && this.err) {
    if (!callback) {
      throw this.err;
    }
    callback(this.err);
  }

  return result;
}

export = using;
