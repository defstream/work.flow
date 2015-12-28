/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var Joi = require('joi');
var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var utils = require('../../lib/utils');

describe('utils', function clientTest() {
  it('should initialize', function shouldInitialize() {
    assert(expect(utils).to.exist);
  });
});
