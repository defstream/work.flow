/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var checkError = require('./check-error');

describe('errors - ExecutionError', function() {
  var ExecutionError = require('../../lib/work/flow/error/execution');

  it('should exist', function test() {
    assert(expect(ExecutionError).to.exist);
  });

  it('should create new NotFoundError()', function test() {
    var expectedError = {
      code: 500
    };
    checkError(ExecutionError, expectedError);
  });

  it('should create new NotFoundError(message)', function test() {
    var expectedError = {
      message: 'no bueneo',
      code: 500
    };
    checkError(ExecutionError, expectedError);
  });
});
