/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var Workflow = require('../index');

var ValidationError = require('../lib/work/flow/error/validation');

var Bad = require('./data/bad');
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

  it('should return flow.path.definition', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.path.definition).to.exist);
    expect(work.flow.path.definition).to.be.instanceOf(Function);
    work.flow.path.definition(Good.path.definition, function(err,
      result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      expect(result.uri).to.equal(Good.path.definition.uri);
      expect(result.properties).to.equal(Good.path.definition.properties);
      done();
    });
  });

  it('should return failed flow.path.definition', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.path.definition).to.exist);
    expect(work.flow.path.definition).to.be.instanceOf(Function);
    work.flow.path.definition(Bad.path.definition, function(err,
      result) {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail flow.path.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.path.definition).to.exist);
    expect(work.flow.path.definition).to.be.instanceOf(Function);
    expect(function() {
      work.flow.path.definition(Bad.path.definition);
    }).to.throw(ValidationError);
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


  it('should return flow.task.definition', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
    work.flow.task.definition(Good.task.definition, function(err,
      result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      expect(result.uri).to.equal(Good.task.definition.uri);
      expect(result.properties).to.equal(Good.task.definition.properties);
      done();
    });
  });


  it('should return failed flow.task.definition', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
    work.flow.task.definition(Bad.task.definition, function(err,
      result) {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });


  it('should fail flow.task.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
    expect(function() {
      work.flow.task.definition(Bad.task.definition);
    }).to.throw(ValidationError);
  });


  it('should flow.definition', function shouldFlowPathDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
  });

  it('should return flow.definition', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
    work.flow.definition(Good.workflow.definition, function(err, result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      expect(result.uri).to.equal(Good.workflow.definition.uri);
      expect(result.properties).to.equal(Good.workflow.definition.properties);
      done();
    });

  });

  it('should return fail flow.definition', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
    work.flow.definition(Bad.workflow.definition, function(err, result) {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });


  it('should return failed flow.definition x2', function shouldFlowTaskDefinition(
    done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
    work.flow.definition({
      uri: ' '
    }, function(err, result) {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });


  it('should fail flow.definition', function shouldFlowTaskDefinition() {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.definition).to.exist);
    expect(function() {
      work.flow.definition(Bad.workflow.definition);
    }).to.throw(ValidationError);
  });

  it('should flow.run', function shouldFlowPathDefinition(done) {
    var work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.run).to.exist);
    expect(work.flow.run).to.be.instanceOf(Function);
    work.flow.run(Good.workflow.run, function(err, result) {
      assert(expect(err).to.not.exist);
      done();
    });
  });
});
