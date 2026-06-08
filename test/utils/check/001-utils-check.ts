'use strict';

import Joi from 'joi';
import assert from 'assert';
import { expect } from 'chai';
import utils = require('../../../lib/utils');

const schema = Joi.object().keys({
  uri: Joi.string().required(),
});

describe('utils.check', () => {
  it('should utils.check(obj)', () => {
    const obj = {};
    assert(expect(() => { utils.check(obj); }).to.not.throw);
    const result = utils.check(obj);
    assert(expect(result).to.exist);
    assert(expect(result.against).to.exist);
    assert(expect(result.against).to.be.instanceOf(Function));
  });

  it('should utils.check()', () => {
    assert(expect(() => { utils.check(); }).to.not.throw);
    const result = utils.check();
    assert(expect(result).to.exist);
    assert(expect(result.against).to.exist);
    assert(expect(result.against).to.be.instanceOf(Function));
  });

  it('should exist - utils.check(obj).against(undefined)', () => {
    const obj = {};
    assert(expect(() => { utils.check(obj).against(); }).to.not.throw);
    const result = utils.check(obj).against();
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
  });

  it('should exist - utils.check(obj).against(schema)', () => {
    const obj = {};
    assert(expect(() => { utils.check(obj).against(schema); }).to.not.throw);
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
  });

  it('should fail - utils.check(obj).against(schema).throwIfFailed', () => {
    const obj = {};
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).throwIfFailed(); }).to.throw);
  });

  it('should pass - utils.check(obj).against(schema).throwIfFailed', () => {
    const obj = { uri: 'valid' };
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).throwIfFailed(); }).to.not.throw());
  });

  it('should fail - utils.check(obj).against(schema).throwIfFailed (null uri)', () => {
    const obj = { uri: null };
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).throwIfFailed(); }).to.throw());
  });

  it('should pass - utils.check(obj).against(schema).using(callback)', (done) => {
    const obj = { uri: 'valid' };

    function callback(_err: Error | null): void {
      assert(expect('should not be called back').to.not.exist);
    }

    assert(expect(() => { utils.check(obj).against(schema); }).to.not.throw());
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).using(callback as (err: Error) => void); }).to.not.throw());

    let failed: boolean;
    expect(() => {
      failed = utils.check(obj).against(schema).using(callback as (err: Error) => void).failed;
    }).to.not.throw();
    expect(failed!).to.equal(false);
    done();
  });

  it('should fail - utils.check(obj).against(schema).using(callback=true)', (done) => {
    const obj = {};

    function callback(err: Error): boolean {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(Error);
      return true;
    }

    function finalCallback(err: Error): boolean {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(Error);
      done();
      return true;
    }

    assert(expect(() => { utils.check(obj).against(schema); }).to.not.throw());
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).using(callback); }).to.not.throw());

    let failed: boolean;
    expect(() => {
      failed = utils.check(obj).against(schema).using(finalCallback).failed;
    }).to.not.throw();
    expect(failed!).to.equal(true);
  });

  it('should fail - utils.check(obj).against(schema).using(callback=false)', (done) => {
    const obj = {};

    function callback(err: Error): boolean {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(Error);
      return false;
    }

    function finalCallback(err: Error): boolean {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(Error);
      done();
      return false;
    }

    assert(expect(() => { utils.check(obj).against(schema); }).to.not.throw());
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).using(callback); }).to.not.throw());

    let failed: boolean;
    expect(() => {
      failed = utils.check(obj).against(schema).using(finalCallback).failed;
    }).to.not.throw();
    expect(failed!).to.equal(true);
  });

  it('should throw - utils.check(obj).against(schema).using()', () => {
    const obj = {};
    const result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
    assert(expect(() => { utils.check(obj).against(schema).using(); }).to.throw());
  });
});
