/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var ValidationError = require('../lib/work/flow/error/validation');

var Work = require('../index');

var Bad = require('./data/bad');
var Good = require('./data/good');

describe('003 workflow.definitions', function() {

  it('should exist', function shouldExist() {
    assert(expect(Work).to.exist);
  });

  it('should create workflow definition', function(done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addWorkflow({
      uri: 'one'
    }, function(err, workflow) {
      assert(expect(err).to.not.exist);
      assert(expect(workflow).to.exist);
      done();
    });
  });

  it('should fail adding duplicate workflow', function(done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addWorkflow({
      uri: 'one'
    }, function(err, workflow) {
      assert(expect(err).to.exist);
      assert(expect(workflow).to.not.exist);
      done();
    });
  });

  it('should fail adding duplicate workflow in another instance', function(
    done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addWorkflow({
      uri: 'one'
    }, function(err, workflow) {
      assert(expect(err).to.exist);
      assert(expect(workflow).to.not.exist);
      done();
    });
  });

  it('should fail adding workflow with invalid uri', function(
    done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addPath({
      uri: null
    }, function(err, workflow) {
      assert(expect(err).to.exist);
      assert(expect(workflow).to.not.exist);
      done();
    });
  });

  it('should create path definition', function(done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addPath({
      uri: 'path:one'
    }, function(err, path) {
      assert(expect(err).to.not.exist);
      assert(expect(path).to.exist);
      done();
    });
  });

  it('should fail adding path workflow', function(done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addPath({
      uri: 'path:one'
    }, function(err, path) {
      assert(expect(err).to.exist);
      assert(expect(path).to.not.exist);
      done();
    });
  });

  it('should fail adding duplicate path in another instance', function(
    done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addPath({
      uri: 'path:one'
    }, function(err, path) {
      assert(expect(err).to.exist);
      assert(expect(path).to.not.exist);
      done();
    });
  });

  it('should fail adding path with invalid uri', function(
    done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addPath({
      uri: null
    }, function(err, path) {
      assert(expect(err).to.exist);
      assert(expect(path).to.not.exist);
      done();
    });
  });


  it('should create task definition', function(done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addTask({
      uri: 'task:one'
    }, function(err, task) {
      assert(expect(err).to.not.exist);
      assert(expect(task).to.exist);
      done();
    });
  });

  it('should fail adding task definition', function(done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addTask({
      uri: 'task:one'
    }, function(err, task) {
      assert(expect(err).to.exist);
      assert(expect(task).to.not.exist);
      done();
    });
  });

  it('should fail adding duplicate task in another instance', function(
    done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addTask({
      uri: 'task:one'
    }, function(err, task) {
      assert(expect(err).to.exist);
      assert(expect(task).to.not.exist);
      done();
    });
  });

  it('should fail adding task with invalid uri', function(
    done) {
    var work = new Work();
    assert(expect(work).to.exist);
    work.flow.definitions.addTask({
      uri: null
    }, function(err, task) {
      assert(expect(err).to.exist);
      assert(expect(task).to.not.exist);
      done();
    });
  });

  it('should get undefined', function() {
    var work = new Work();
    assert(expect(work).to.exist);
    expect(work.flow.definitions.get()).to.equal(undefined);
  });
});
