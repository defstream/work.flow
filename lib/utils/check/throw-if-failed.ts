'use strict';

function throwIfFailed(this: { err: Error | null }): null {
  if (this.err) {
    throw this.err;
  }
  return null;
}

export = throwIfFailed;
