'use strict';

import assert from 'assert';
import { expect } from 'chai';
import State = require('../lib/work/flow/state');

describe('004 workflow.state', () => {
  it('should exist', () => {
    assert(expect(State).to.exist);
  });

  it('should initialize', () => {
    const state = new State();
    assert(expect(state).to.exist);
  });

  it('should start', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      done();
    });
  });

  it('should start with a second instance', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      done();
    });
  });

  it('should start same name', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      state.start('a', (err2) => {
        assert(expect(err2).to.exist);
        done();
      });
    });
  });

  it('should complete', (done) => {
    const state = new State();
    state.start('a', () => {
      state.complete('a', (err) => {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should complete with a second instance', (done) => {
    const state = new State();
    state.start('a', () => {
      state.complete('a', (err) => {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should complete same name', (done) => {
    const state = new State();
    state.start('a', () => {
      state.complete('a', (err) => {
        assert(expect(err).to.not.exist);
        state.complete('a', (err2) => {
          assert(expect(err2).to.exist);
          done();
        });
      });
    });
  });

  it('should fail non started complete', (done) => {
    const state = new State();
    state.complete('a', (err) => {
      assert(expect(err).to.exist);
      done();
    });
  });

  it('should pass - fail', (done) => {
    const state = new State();
    state.start('a', () => {
      state.fail('a', (err) => {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should pass - fail with a second instance', (done) => {
    const state = new State();
    state.start('a', () => {
      state.fail('a', (err) => {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should pass - fail same name', (done) => {
    const state = new State();
    state.start('a', () => {
      state.fail('a', (err) => {
        assert(expect(err).to.not.exist);
        state.fail('a', (err2) => {
          assert(expect(err2).to.exist);
          done();
        });
      });
    });
  });

  it('should not pass - fail non started fail', (done) => {
    const state = new State();
    state.fail('a', (err) => {
      assert(expect(err).to.exist);
      done();
    });
  });

  it('should pass - awaits', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      state.awaits({ names: ['a'] }, (err2) => {
        assert(expect(err2).to.not.exist);
        done();
      });
      setImmediate(() => {
        state.complete('a', (err3) => {
          assert(expect(err3).to.not.exist);
        });
      });
    });
  });

  it('should fail - awaits invalid options', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      state.awaits(['a'] as unknown as { names: string[] }, (err2) => {
        assert(expect(err2).to.exist);
        done();
      });
    });
  });

  it('should fail - awaits invalid options x2', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      state.awaits(null, (err2) => {
        assert(expect(err2).to.exist);
        done();
      });
    });
  });

  it('should fail - non started awaitee', (done) => {
    const state = new State();
    state.awaits({ names: ['b'] }, (err) => {
      assert(expect(err).to.exist);
      done();
    });
  });

  it('should pass - awaiting after completion', (done) => {
    const state = new State();
    state.start('a', (err) => {
      assert(expect(err).to.not.exist);
      state.complete('a', (err2) => {
        assert(expect(err2).to.not.exist);
        state.awaits({ names: ['a'] }, (err3) => {
          assert(expect(err3).to.not.exist);
          done();
        });
      });
    });
  });

  it('should pass - awaiting after two completions', (done) => {
    const state = new State();
    state.start('b', (err) => {
      assert(expect(err).to.not.exist);
      state.start('a', () => {
        state.complete('a', (err2) => {
          assert(expect(err2).to.not.exist);
          state.complete('b', (err3) => {
            assert(expect(err3).to.not.exist);
            state.awaits({ names: ['a', 'b'] }, (err4) => {
              assert(expect(err4).to.not.exist);
              done();
            });
          });
        });
      });
    });
  });

  it('should fail - await timeouts', (done) => {
    const state = new State();
    state.start('b', () => {
      state.start('a', () => {
        state.awaits({ names: ['a'], timeout: 500 }, (err) => {
          assert(expect(err).to.exist);
        });
        setTimeout(() => {
          state.complete('a', (err) => {
            assert(expect(err).to.not.exist);
            done();
          });
        }, 1000);
      });
    });
  });

  it('should pass - awaiting multiple after completion', (done) => {
    const state = new State();
    state.start('a', () => {
      state.start('b', () => {
        state.start('c', () => {
          state.awaits({ names: ['a', 'b'] }, (err) => {
            assert(expect(err).to.not.exist);
            done();
          });
          state.complete('b', () => {
            state.complete('c', () => {
              state.complete('a', () => {});
            });
          });
        });
      });
    });
  });
});
