'use strict';

import assert from 'assert';
import { expect } from 'chai';
import Workflow = require('../index');
import ValidationError = require('../lib/work/flow/error/validation');
import Bad = require('./data/bad');
import Good = require('./data/good');

describe('client', () => {
  it('should initialize', () => {
    assert(expect(Workflow).to.exist);
    const work = new Workflow();
    assert(expect(work).to.exist);
  });

  it('should flow', () => {
    const work = new Workflow();
    assert(expect(work).to.exist);
    assert(expect(work.flow).to.exist);
  });

  it('should flow.path', () => {
    const work = new Workflow();
    assert(expect(work.flow).to.exist);
    assert(expect(work.flow.path).to.exist);
  });

  it('should flow.path.definition', () => {
    const work = new Workflow();
    assert(expect(work.flow.path.definition).to.exist);
    expect(work.flow.path.definition).to.be.instanceOf(Function);
  });

  it('should return flow.path.definition', (done) => {
    const work = new Workflow();
    expect(work.flow.path.definition).to.be.instanceOf(Function);
    work.flow.path.definition(Good.path.definition, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      expect((result as { uri: string }).uri).to.equal((Good.path.definition as { uri: string }).uri);
      done();
    });
  });

  it('should return failed flow.path.definition', (done) => {
    const work = new Workflow();
    work.flow.path.definition(Bad.path.definition, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail flow.path.definition', () => {
    const work = new Workflow();
    expect(() => {
      work.flow.path.definition(Bad.path.definition);
    }).to.throw(ValidationError);
  });

  it('should flow.task', () => {
    const work = new Workflow();
    assert(expect(work.flow.task).to.exist);
  });

  it('should flow.task.definition', () => {
    const work = new Workflow();
    assert(expect(work.flow.task.definition).to.exist);
    expect(work.flow.task.definition).to.be.instanceOf(Function);
  });

  it('should return flow.task.definition', (done) => {
    const work = new Workflow();
    work.flow.task.definition(Good.task.definition, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      expect((result as { uri: string }).uri).to.equal((Good.task.definition as { uri: string }).uri);
      done();
    });
  });

  it('should return failed flow.task.definition', (done) => {
    const work = new Workflow();
    work.flow.task.definition(Bad.task.definition, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail flow.task.definition', () => {
    const work = new Workflow();
    expect(() => {
      work.flow.task.definition(Bad.task.definition);
    }).to.throw(ValidationError);
  });

  it('should flow.definition', () => {
    const work = new Workflow();
    assert(expect(work.flow.definition).to.exist);
    expect(work.flow.definition).to.be.instanceOf(Function);
  });

  it('should return flow.definition', (done) => {
    const work = new Workflow();
    work.flow.definition(Good.workflow.definition, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
      expect((result as { uri: string }).uri).to.equal((Good.workflow.definition as { uri: string }).uri);
      done();
    });
  });

  it('should return fail flow.definition', (done) => {
    const work = new Workflow();
    work.flow.definition(Bad.workflow.definition, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should return failed flow.definition x2', (done) => {
    const work = new Workflow();
    work.flow.definition({ uri: ' ' }, (err: Error | null, result?: unknown) => {
      assert(expect(err).to.exist);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should fail flow.definition', () => {
    const work = new Workflow();
    expect(() => {
      work.flow.definition(Bad.workflow.definition);
    }).to.throw(ValidationError);
  });

  it('should flow.run', (done) => {
    const work = new Workflow();
    assert(expect(work.flow.run).to.exist);
    expect(work.flow.run).to.be.instanceOf(Function);
    work.flow.run(Good.workflow.run, (err: Error | null) => {
      assert(expect(err).to.not.exist);
      done();
    });
  });
});
