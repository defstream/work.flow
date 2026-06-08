'use strict';

import assert from 'assert';
import { expect } from 'chai';
import checkError = require('./helper/check-error');
import NotFoundError = require('../../lib/work/flow/error/not-found');

describe('errors - NotFoundError', () => {
  it('should exist', () => {
    assert(expect(NotFoundError).to.exist);
  });

  it('should create new NotFoundError()', () => {
    const expectedError = { code: 404 };
    checkError(NotFoundError, expectedError);
  });

  it('should create new NotFoundError(message)', () => {
    const expectedError = { message: 'not found', code: 404 };
    checkError(NotFoundError, expectedError);
  });
});
