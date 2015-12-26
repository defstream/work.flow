/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var checkError = require('./check-error');

describe('errors - TimeoutError', function() {
  var TimeoutError = require('../../lib/work/flow/error/timeout');

  it('should exist', function test() {
    assert(expect(TimeoutError).to.exist);
  });

  it('should create new TimeoutError()', function test() {
    var expectedError = {
      code: 408
    };
    checkError(TimeoutError, expectedError);
  });

  it('should create new TimeoutError(message)', function test() {
    var expectedError = {
      message: 'no bueneo',
      code: 408
    };
    checkError(TimeoutError, expectedError);
  });
});
