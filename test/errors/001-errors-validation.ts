'use strict';

import assert from 'assert';
import { expect } from 'chai';
import checkError = require('./helper/check-error');
import ValidationError = require('../../lib/work/flow/error/validation');

describe('errors - ValidationError', () => {
  it('should exist', () => {
    assert(expect(ValidationError).to.exist);
  });

  it('should create new ValidationError()', () => {
    const expectedError = { code: 400 };
    checkError(ValidationError, expectedError);
  });

  it('should create new ValidationError(message)', () => {
    const expectedError = { message: 'no bueneo', code: 400 };
    checkError(ValidationError, expectedError);
  });
});
