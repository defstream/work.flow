/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var utils = require('../../../lib/utils');
describe('utils.property', function clientTest() {

  function check(property) {
    return {
      against: function against(test) {
        if (property) {
          assert(expect(property).to.exist);
          assert(expect(property.enumerable).to.equal(test.enumerable));
          assert(expect(property.value).to.equal(test.value));
        }
      }
    };
  }

  it('should create property(value, enumerable=true)', function shouldInitialize() {
    var test = {
      value: 'hello world',
      enumerable: true
    };
    var property = utils.property(test.value, test.enumerable);
    check(property).against(test);
  });

  it('should create property(value, enumerable=false)', function shouldInitialize() {
    var test = {
      value: 'hello world',
      enumerable: false
    };
    var property = utils.property(test.value, test.enumerable);
    check(property).against(test);
  });


  it('should create property(value, enumerable=undefined)', function shouldInitialize() {
    var test = {
      value: 'hello world',
      enumerable: false
    };
    var property = utils.property(test.value);
    check(property).against(test);
  });


  it('should create property()', function shouldInitialize() {
    var test = {
      value: undefined,
      enumerable: false
    };
    var property = utils.property();
    check(property).against(test);
  });

  it('should create property(false)', function shouldInitialize() {
    var test = {
      value: false,
      enumerable: false
    };
    var property = utils.property(test.value);
    check(property).against(test);
  });
  it('should create property(true)', function shouldInitialize() {
    var test = {
      value: true,
      enumerable: false
    };
    var property = utils.property(test.value);
    check(property).against(test);
  });

});
