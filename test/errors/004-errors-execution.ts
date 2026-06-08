'use strict';

import assert from 'assert';
import { expect } from 'chai';
import checkError = require('./helper/check-error');
import ExecutionError = require('../../lib/work/flow/error/execution');

describe('errors - ExecutionError', () => {
  it('should exist', () => {
    assert(expect(ExecutionError).to.exist);
  });

  it('should create new ExecutionError()', () => {
    const expectedError = { code: 500 };
    checkError(ExecutionError, expectedError);
  });

  it('should create new ExecutionError(message)', () => {
    const expectedError = { message: 'execution failed', code: 500 };
    checkError(ExecutionError, expectedError);
  });
});
