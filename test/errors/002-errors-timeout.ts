'use strict';

import assert from 'assert';
import { expect } from 'chai';
import checkError = require('./helper/check-error');
import TimeoutError = require('../../lib/work/flow/error/timeout');

describe('errors - TimeoutError', () => {
  it('should exist', () => {
    assert(expect(TimeoutError).to.exist);
  });

  it('should create new TimeoutError()', () => {
    const expectedError = { code: 408 };
    checkError(TimeoutError, expectedError);
  });

  it('should create new TimeoutError(message)', () => {
    const expectedError = { message: 'timed out', code: 408 };
    checkError(TimeoutError, expectedError);
  });
});
