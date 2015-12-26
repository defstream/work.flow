/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var checkError = require('./check-error');

describe('errors - NotFoundError', function() {
  var NotFoundError = require('../../lib/work/flow/error/not-found');

  it('should exist', function test() {
    assert(expect(NotFoundError).to.exist);
  });

  it('should create new NotFoundError()', function test() {
    var expectedError = {
      code: 404
    };
    checkError(NotFoundError, expectedError);
  });

  it('should create new NotFoundError(message)', function test() {
    var expectedError = {
      message: 'no bueneo',
      code: 404
    };
    checkError(NotFoundError, expectedError);
  });
});
