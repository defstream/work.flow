/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var Joi = require('Joi');
var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var utils = require('../../../lib/utils');

var schema = Joi.object().keys({
  uri: Joi.string().required()
});

describe('utils.check', function() {

  it('should utils.check(obj)', function utilsCheck() {
    var obj = {

    };

    assert(expect(function() {
      utils.check(obj);
    }).to.not.throw);

    var result = utils.check(obj);
    assert(expect(result).to.exist);
    assert(expect(result.against).to.exist);
    assert(expect(result.against).to.be.instanceOf(Function));
  });

  it('should utils.check()', function utilsCheck() {
    assert(expect(function() {
      utils.check();
    }).to.not.throw);

    var result = utils.check();
    assert(expect(result).to.exist);
    assert(expect(result.against).to.exist);
    assert(expect(result.against).to.be.instanceOf(Function));
  });

  it('should exist - utils.check(obj).against(undefined)', function utilsCheck() {
    var obj = {};
    assert(expect(function() {
      utils.check(obj).against();
    }).to.not.throw);
    var result = utils.check(obj).against();
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
  });

  it('should exist - utils.check(obj).against(schema)', function utilsCheck() {
    var obj = {};
    assert(expect(function() {
      utils.check(obj).against(schema);
    }).to.not.throw);
    var result = utils.check(obj).against(schema);
    assert(expect(result.throwIfFailed).to.exist);
    assert(expect(result.using).to.exist);
  });

  it('should fail - utils.check(obj).against(schema).throwIfFailed',
    function utilsCheck() {
      var obj = {};
      assert(expect(function() {
        utils.check(obj).against(schema);
      }).to.not.throw);
      var result = utils.check(obj).against(schema);
      assert(expect(result.throwIfFailed).to.exist);
      assert(expect(result.using).to.exist);
      assert(expect(function() {
        utils.check(obj).against(schema).throwIfFailed();
      }).to.throw);
    });

  it('should pass - utils.check(obj).against(schema).throwIfFailed',
    function utilsCheck() {
      var obj = {
        uri: 'valid'
      };
      assert(expect(function() {
        utils.check(obj).against(schema);
      }).to.not.throw);
      var result = utils.check(obj).against(schema);
      assert(expect(result.throwIfFailed).to.exist);
      assert(expect(result.using).to.exist);
      assert(expect(function() {
        utils.check(obj).against(schema).throwIfFailed();
      }).to.not.throw());
    });


  it('should pass - utils.check(obj).against(schema).using(callback)',
    function check(done) {
      var obj = {
        uri: 'valid'
      };

      function callback(err) {
        assert(expect('should not be called back').to.not.exist);
      }

      assert(expect(function() {
        utils.check(obj).against(schema);
      }).to.not.throw());

      var result = utils.check(obj).against(schema);
      assert(expect(result.throwIfFailed).to.exist);
      assert(expect(result.using).to.exist);
      assert(expect(function() {
        utils.check(obj).against(schema).using(callback);
      }).to.not.throw());


      var failed;
      expect(function() {
        failed = utils.check(obj).against(schema).using(callback).failed;
      }).to.not.throw();
      expect(failed).to.equal(false);
      done();
    });


  it('should fail - utils.check(obj).against(schema).using(callback=true)',
    function check(done) {
      var obj = {

      };

      function callback(err) {
        assert(expect(err).to.exist);
        expect(err).to.be.instanceOf(Error);
        return true;
      }

      function finalCallback(err) {
        assert(expect(err).to.exist);
        expect(err).to.be.instanceOf(Error);
        done();
        return true;
      }

      assert(expect(function() {
        utils.check(obj).against(schema);
      }).to.not.throw());

      var result = utils.check(obj).against(schema);
      assert(expect(result.throwIfFailed)
        .to.exist);
      assert(expect(result.using).to.exist);
      assert(expect(function() {
        utils.check(obj).against(schema).using(callback);
      }).to.not.throw());


      var failed;
      expect(function() {
        failed = utils.check(obj).against(schema).using(finalCallback)
          .failed;
      }).to.not.throw();
      expect(failed).to.equal(true);

    });


  it('should fail - utils.check(obj).against(schema).using(callback=false)',
    function check(done) {
      var obj = {

      };

      function callback(err) {
        assert(expect(err).to.exist);
        expect(err).to.be.instanceOf(Error);

        return false;
      }

      function finalCallback(err) {
        assert(expect(err).to.exist);
        expect(err).to.be.instanceOf(Error);
        done();
        return false;
      }

      assert(expect(function() {
        utils.check(obj).against(schema);
      }).to.not.throw());

      var result = utils.check(obj).against(schema);
      assert(expect(result.throwIfFailed)
        .to.exist);
      assert(expect(result.using).to.exist);
      assert(expect(function() {
        utils.check(obj).against(schema).using(callback);
      }).to.not.throw());


      var failed;
      expect(function() {
        failed = utils.check(obj).against(schema).using(finalCallback)
          .failed;
      }).to.not.throw();
      expect(failed).to.equal(true);

    });

  it('should throw - utils.check(obj).against(schema).using()',
    function check() {
      var obj = {

      };

      assert(expect(function() {
        utils.check(obj).against(schema);
      }).to.not.throw());

      var result = utils.check(obj).against(schema);
      assert(expect(result.throwIfFailed)
        .to.exist);
      assert(expect(result.using).to.exist);
      assert(expect(function() {
        utils.check(obj).against(schema).using();
      }).to.throw());
    });
});
