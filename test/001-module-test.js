/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var Workflow = require('../index');

describe('client', function clientTest() {
  it('should initialize', function shouldInitialize() {
    assert(expect(Workflow).to.exist);

    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work).to.exist);
  });

  it('should flow', function shouldFlow() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
  });

  it('should flow.path', function shouldFlowPath() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.path).to.exist);
  });

  it('should flow.path.definition', function shouldFlowPathDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.path.definition).to.exist);
    expect(work.flow.path.definition).to.be.instanceOf(Function);
  });

  it('should flow.task', function shouldFlowTask() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task).to.exist);
  });

  it('should flow.task.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
  });
});
