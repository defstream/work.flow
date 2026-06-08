'use strict';

import assert from 'assert';
import { expect } from 'chai';
import ValidationError = require('../lib/work/flow/error/validation');
import format = require('../lib/work/flow/properties/format');
import parse = require('../lib/work/flow/properties/parse');

describe('properties.format', () => {
  it('should exist', () => {
    assert(expect(format).to.exist);
  });

  it('should fail - invalid options', (done) => {
    format(undefined as unknown as Parameters<typeof format>[0], (err, result) => {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should format', (done) => {
    const options = {
      value: { for: 'Bob' },
      properties: {
        for: { type: String, value: 'Buddy' },
        prompt: {
          type: String,
          value: 'Hello {player-one.name}, Welcome to Escape from 1999. {extra-message} {player-one.age}',
          readOnly: true,
        },
        year: { type: Number, value: 1999, readOnly: true },
      },
    };
    const state = {
      completed: {
        'player-one': { value: { name: 'Joe' } },
        game: { value: 'Escape from 1999' },
      },
    };

    parse(options, (err, properties) => {
      assert(expect(err).to.not.exist);
      assert(expect(properties).to.exist);
      format({ properties: properties!, state }, (err2, result) => {
        assert(expect(err2).to.not.exist);
        assert(expect(result).to.exist);
        expect((result as { for: string }).for).to.equal('Bob');
        expect((result as { prompt: string }).prompt).to.equal(
          'Hello Joe, Welcome to Escape from 1999. {extra-message} {player-one.age}'
        );
        done();
      });
    });
  });
});
