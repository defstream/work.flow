'use strict';

import assert from 'assert';
import { expect } from 'chai';
import utils = require('../../lib/utils');

describe('utils', () => {
  it('should initialize', () => {
    assert(expect(utils).to.exist);
  });
});
