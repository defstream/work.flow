'use strict';

import assert from 'assert';
import { expect } from 'chai';
import ValidationError = require('../lib/work/flow/error/validation');
import parse = require('../lib/work/flow/properties/parse');

describe('properties.parse', () => {
  it('should exist', () => {
    assert(expect(parse).to.exist);
  });

  it('should fail - invalid options', (done) => {
    parse(undefined as unknown as Parameters<typeof parse>[0], (err, result) => {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should parse', (done) => {
    const options = {
      value: { for: 'Bob' },
      properties: {
        for: { type: String, value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      done();
    });
  });

  it('should parse extra properties', (done) => {
    const options = {
      value: { for: 'Bob', to: 'Bill' },
      properties: {
        for: { type: String, value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      done();
    });
  });

  it('should parse - dynamic type', (done) => {
    const options = {
      value: { for: 'Bob' },
      properties: {
        for: { type: 'string', value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      done();
    });
  });

  it('should parse - no type', (done) => {
    const options = {
      value: { for: 'Bob' },
      properties: {
        for: { value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      done();
    });
  });

  it('should parse - invalid property type', (done) => {
    const options = {
      value: { for: 'Bob' },
      properties: {
        for: { value: 'Buddy' },
        prompt: { type: 123231 as unknown as string },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      done();
    });
  });

  it('should parse - invalid readOnly', (done) => {
    const options = {
      value: { for: 'Bob', prompt: 'what' },
      properties: {
        for: { value: 'Buddy' },
        prompt: { readOnly: 'a' as unknown as boolean },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail - readOnly', (done) => {
    const options = {
      value: { for: 'Bob', prompt: 'Hello WORLD' },
      properties: {
        for: { type: String, value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail - Invalid Static Type', (done) => {
    const options = {
      value: { for: 99 },
      properties: {
        for: { type: String, value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail - Invalid Dynamic Type', (done) => {
    const options = {
      value: { for: 99 },
      properties: {
        for: { type: 'string', value: 'Buddy' },
        prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true },
      },
    };
    parse(options, (err, result) => {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });
});
