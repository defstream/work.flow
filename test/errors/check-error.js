var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

module.exports = function checkErorr(E, test) {
  var err = new E(test.message);
  assert(expect(err).to.exist);
  assert(expect(err).to.be.instanceOf(Error));
  assert(expect(err).to.be.instanceOf(E));
  assert(expect(err.code).to.equal(test.code));
  assert(expect(err.message).to.equal(test.message));

  return err;
};
