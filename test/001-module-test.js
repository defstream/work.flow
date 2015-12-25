/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var Workflow = require('../index');

var Good = require('./data/good');

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

  it('should return flow.path.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
    var path = work.flow.path.definition(Good.path.definition);
    assert(expect(path).to.exist);
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


  it('should return flow.task.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
    var task = work.flow.task.definition(Good.task.definition);
    assert(expect(task).to.exist);
  });

  it('should flow.definition', function shouldFlowPathDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
  });

  it('should return flow.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
    var flow = work.flow.definition(Good.workflow.definition);
    assert(expect(flow).to.exist);
  });

  it('should flow.run', function shouldFlowPathDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.run).to.exist);
    expect(work.flow.run).to.be.instanceOf(Function);
    work.flow.run(Good.workflow.run, function(err, result) {
      assert(expect(err).to.not.exist);
    });
  });
});
