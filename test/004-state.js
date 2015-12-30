/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var ValidationError = require('../lib/work/flow/error/validation');

var State = require('../lib/work/flow/state');

var Bad = require('./data/bad');
var Good = require('./data/good');

describe('004 workflow.state', function() {
  it('should exist', function() {
    assert(expect(State).to.exist);
  });

  it('should initialize', function() {
    var state = new State();
    assert(expect(state).to.exist);
  });

  it('should start', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      assert(expect(err).to.not.exist);
      done();
    });
  });

  it('should start with a second instance', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      assert(expect(err).to.not.exist);
      done();
    });
  });

  it('should start same name', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err) {
      assert(expect(err).to.not.exist);
      state.start('a', function(err) {
        assert(expect(err).to.exist);
        done();
      });
    });
  });

  it('should complete', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      state.complete('a', function(err, result) {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should complete with a second instance', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      state.complete('a', function(err, result) {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should complete same name', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      state.complete('a', function(err) {
        assert(expect(err).to.not.exist);
        state.complete('a', function(err) {
          assert(expect(err).to.exist);
          done();
        });
      });
    });
  });

  it('should fail non started complete', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.complete('a', function(err) {
      assert(expect(err).to.exist.exist);
      done();
    });
  });


  it('should pass - fail', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      state.fail('a', function(err, result) {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should pass - fail with a second instance', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      state.fail('a', function(err, result) {
        assert(expect(err).to.not.exist);
        done();
      });
    });
  });

  it('should pass - fail same name', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err, result) {
      state.fail('a', function(err) {
        assert(expect(err).to.not.exist);
        state.fail('a', function(err) {
          assert(expect(err).to.exist);
          done();
        });
      });
    });
  });

  it('should not pass - fail non started fail', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.fail('a', function(err) {
      assert(expect(err).to.exist);
      done();
    });
  });


  it('should pass - awaits', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err) {
      assert(expect(err).to.not.exist);
      state.awaits({
        names: ['a']
      }, function(err) {
        assert(expect(err).to.not.exist);
        done();
      });
      setImmediate(function() {
        state.complete('a', function(err, result) {
          assert(expect(err).to.not.exist);
        });
      });
    });
  });

  it('should fail - awaits invalid options', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err) {
      assert(expect(err).to.not.exist);
      state.awaits(['a'], function(err) {
        assert(expect(err).exist);
        done();
      });
    });
  });


  it('should fail - awaits invalid options x2', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err) {
      assert(expect(err).to.not.exist);
      state.awaits(null, function(err) {
        assert(expect(err).exist);
        done();
      });
    });
  });


  it('should fail - non started awaitee', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.awaits({
      names: ['b']
    }, function(err) {
      assert(expect(err).exist);
      done();
    });
  });


  it('should pass - awaiting after completion', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err) {
      assert(expect(err).to.not.exist);
      state.complete('a', function(err, result) {
        assert(expect(err).to.not.exist);
        state.awaits({
          names: ['a']
        }, function(err) {
          assert(expect(err).to.not.exist);
          done();
        });
      });
    });
  });


  it('should pass - awaiting after completion', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('b', function(err) {
      assert(expect(err).to.not.exist);
      state.start('a', function(err) {
        state.complete('a', function(err) {

          assert(expect(err).to.not.exist);
          state.complete('b', function(err, result) {
            assert(expect(err).to.not.exist);
            state.awaits({
              names: ['a', 'b']
            }, function(err) {
              assert(expect(err).to.not.exist);
              done();
            });
          });
        });
      });

    });
  });


  it('should fail - await timeouts', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('b', function(err) {
      assert(expect(err).to.not.exist);

      state.start('a', function(err) {
        assert(expect(err).to.not.exist);
        state.awaits({
          names: ['a'],
          timeout: 500
        }, function(err) {
          assert(expect(err).to.exist);
        });
        setTimeout(function() {
          state.complete('a', function(err, result) {
            assert(expect(err).to.not.exist);
            done();
          });
        }, 1000);
      });
    });
  });



  it('should pass - awaiting after completion', function(done) {
    var state = new State();
    assert(expect(state).to.exist);
    state.start('a', function(err) {
      assert(expect(err).to.not.exist);
      state.start('b', function(err) {
        assert(expect(err).to.not.exist);
        state.start('c', function(err) {
          assert(expect(err).to.not.exist);
          state.awaits({
            names: ['a', 'b']
          }, function(err) {
            assert(expect(err).to.not.exist);
            done();
          });

          state.complete('b', function(err) {
            assert(expect(err).to.not.exist);
            state.complete('c', function(err) {
              assert(expect(err).to.not.exist);
              state.complete('a', function(
                err) {
                assert(expect(err).to.not
                  .exist);

              });

            });
          });
        });
      });
    });
  });
});
