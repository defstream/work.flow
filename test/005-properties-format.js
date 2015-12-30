/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var ValidationError = require('../lib/work/flow/error/validation');

var format = require('../lib/work/flow/properties/format');
var parse = require('../lib/work/flow/properties/parse');

describe('properties.format', function clientTest() {

  it('should exist', function shouldExist() {
    assert(expect(format).to.exist);
  });


  it('should fail - invalid options', function(done) {

    var options;
    assert(expect(format).to.exist);

    format(options, function(err, result) {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should format', function(done) {
    var options = {
      value: {
        for: 'Bob'
      },
      properties: {
        for: {
          type: String,
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hello {player-one.name}, Welcome to Escape from 1999. {extra-message} {player-one.age}',
          readOnly: true
        },
        year: {
          type: Number,
          value: 1999,
          readOnly: true
        }
      }
    };
    var state = {
      completed: {
        "player-one": {
          value: {
            name: "Joe"
          }
        },
        "game": {
          value: "Escape from 1999"
        }
      }
    };

    assert(expect(format).to.exist);
    parse(options, function(err, properties) {
      assert(expect(err).to.not.exist);
      assert(expect(properties).to.exist);
      format({
        properties: properties,
        state: state
      }, function(err, result) {
        assert(expect(err).to.not.exist);
        assert(expect(result).to.exist);
        expect(result.for).to.equal('Bob');
        expect(result.prompt).to.equal(
          'Hello Joe, Welcome to Escape from 1999. {extra-message} {player-one.age}'
        );
        done();
      });
    });
  });
});
