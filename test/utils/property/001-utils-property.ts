'use strict';

import assert from 'assert';
import { expect } from 'chai';
import utils = require('../../../lib/utils');

describe('utils.property', () => {
  function check(property: { value: unknown; enumerable: boolean } | undefined) {
    return {
      against(test: { value: unknown; enumerable: boolean }) {
        if (property) {
          assert(expect(property).to.exist);
          assert(expect(property.enumerable).to.equal(test.enumerable));
          assert(expect(property.value).to.equal(test.value));
        }
      },
    };
  }

  it('should create property(value, enumerable=true)', () => {
    const test = { value: 'hello world', enumerable: true };
    const property = utils.property(test.value, test.enumerable);
    check(property).against(test);
  });

  it('should create property(value, enumerable=false)', () => {
    const test = { value: 'hello world', enumerable: false };
    const property = utils.property(test.value, test.enumerable);
    check(property).against(test);
  });

  it('should create property(value, enumerable=undefined)', () => {
    const test = { value: 'hello world', enumerable: false };
    const property = utils.property(test.value);
    check(property).against(test);
  });

  it('should create property()', () => {
    const test = { value: undefined, enumerable: false };
    const property = utils.property();
    check(property).against(test);
  });

  it('should create property(false)', () => {
    const test = { value: false, enumerable: false };
    const property = utils.property(test.value);
    check(property).against(test);
  });

  it('should create property(true)', () => {
    const test = { value: true, enumerable: false };
    const property = utils.property(test.value);
    check(property).against(test);
  });
});
