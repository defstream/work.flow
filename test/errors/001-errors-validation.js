/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var checkError = require('./helper/check-error');

describe('errors - ValidationError', function() {
  var ValidationError = require('../../lib/work/flow/error/validation');

  it('should exist', function test() {
    assert(expect(ValidationError).to.exist);
  });

  it('should create new ValidationError()', function test() {
    var expectedError = {
      code: 400
    };
    checkError(ValidationError, expectedError);
  });

  it('should create new ValidationError(message)', function test() {
    var expectedError = {
      message: 'no bueneo',
      code: 400
    };
    checkError(ValidationError, expectedError);
  });
});
