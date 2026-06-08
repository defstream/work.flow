'use strict';

import { expect } from 'chai';
import assert from 'assert';

type ErrorConstructor = new (message?: string) => Error & { code?: number };

function checkError(E: ErrorConstructor, test: { message?: string; code?: number }): Error {
  const err = new E(test.message);
  assert(expect(err).to.exist);
  assert(expect(err).to.be.instanceOf(Error));
  assert(expect(err).to.be.instanceOf(E));
  if (test.code !== undefined) {
    assert(expect((err as { code?: number }).code).to.equal(test.code));
  }
  assert(expect(err.message).to.equal(test.message));
  return err;
}

export = checkError;
