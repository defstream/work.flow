'use strict';

import assert from 'assert';
import { expect } from 'chai';
import Workflow = require('../index');

describe('003 workflow.definitions', () => {
  it('should exist', () => {
    assert(expect(Workflow).to.exist);
  });

  it('should create workflow definition', (done) => {
    const work = new Workflow();
    work.flow.definitions.addWorkflow({ uri: 'one' }, (err, workflow) => {
      assert(expect(err).to.not.exist);
      assert(expect(workflow).to.exist);
      done();
    });
  });

  it('should fail adding duplicate workflow', (done) => {
    const work = new Workflow();
    work.flow.definitions.addWorkflow({ uri: 'one' }, (err, workflow) => {
      assert(expect(err).to.exist);
      assert(expect(workflow).to.not.exist);
      done();
    });
  });

  it('should fail adding duplicate workflow in another instance', (done) => {
    const work = new Workflow();
    work.flow.definitions.addWorkflow({ uri: 'one' }, (err, workflow) => {
      assert(expect(err).to.exist);
      assert(expect(workflow).to.not.exist);
      done();
    });
  });

  it('should fail adding workflow with invalid uri', (done) => {
    const work = new Workflow();
    work.flow.definitions.addPath({ uri: null as unknown as string }, (err, workflow) => {
      assert(expect(err).to.exist);
      assert(expect(workflow).to.not.exist);
      done();
    });
  });

  it('should create path definition', (done) => {
    const work = new Workflow();
    work.flow.definitions.addPath({ uri: 'path:one' }, (err, path) => {
      assert(expect(err).to.not.exist);
      assert(expect(path).to.exist);
      done();
    });
  });

  it('should fail adding path workflow', (done) => {
    const work = new Workflow();
    work.flow.definitions.addPath({ uri: 'path:one' }, (err, path) => {
      assert(expect(err).to.exist);
      assert(expect(path).to.not.exist);
      done();
    });
  });

  it('should fail adding duplicate path in another instance', (done) => {
    const work = new Workflow();
    work.flow.definitions.addPath({ uri: 'path:one' }, (err, path) => {
      assert(expect(err).to.exist);
      assert(expect(path).to.not.exist);
      done();
    });
  });

  it('should fail adding path with invalid uri', (done) => {
    const work = new Workflow();
    work.flow.definitions.addPath({ uri: null as unknown as string }, (err, path) => {
      assert(expect(err).to.exist);
      assert(expect(path).to.not.exist);
      done();
    });
  });

  it('should create task definition', (done) => {
    const work = new Workflow();
    work.flow.definitions.addTask({ uri: 'task:one' }, (err, task) => {
      assert(expect(err).to.not.exist);
      assert(expect(task).to.exist);
      done();
    });
  });

  it('should fail adding task definition', (done) => {
    const work = new Workflow();
    work.flow.definitions.addTask({ uri: 'task:one' }, (err, task) => {
      assert(expect(err).to.exist);
      assert(expect(task).to.not.exist);
      done();
    });
  });

  it('should fail adding duplicate task in another instance', (done) => {
    const work = new Workflow();
    work.flow.definitions.addTask({ uri: 'task:one' }, (err, task) => {
      assert(expect(err).to.exist);
      assert(expect(task).to.not.exist);
      done();
    });
  });

  it('should fail adding task with invalid uri', (done) => {
    const work = new Workflow();
    work.flow.definitions.addTask({ uri: null as unknown as string }, (err, task) => {
      assert(expect(err).to.exist);
      assert(expect(task).to.not.exist);
      done();
    });
  });

  it('should get undefined', () => {
    const work = new Workflow();
    expect(work.flow.definitions.get()).to.equal(undefined);
  });
});
