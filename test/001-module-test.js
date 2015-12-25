/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var Workflow = require('../index');

describe('initialization', function() {
  it('should initialize', function() {
    assert(expect(Workflow).to.exist);

    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work).to.exist);
  });
});
