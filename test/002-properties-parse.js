/*jslint node: true */
/*global module, require,describe,it*/
'use strict';

var mocha = require('mocha');
var assert = require('assert');
var expect = require('chai').expect;

var ValidationError = require('../lib/work/flow/error/validation');

var parse = require('../lib/work/flow/properties/parse');

describe('properties.parse', function clientTest() {

  it('should exist', function shouldExist() {
    assert(expect(parse).to.exist);
  });


  it('should fail - invalid options', function shouldParse(done) {

    var options;
    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });

  it('should parse', function shouldParse() {

    var options = {
      value: {
        for: 'Bob'
      },
      properties: {
        for: {
          type: String,
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
    });
  });

  it('should parse extra properties', function shouldParse() {

    var options = {
      value: {
        for: 'Bob',
        to: 'Bill'
      },
      properties: {
        for: {
          type: String,
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
    });
  });

  it('should parse - dynamic type', function shouldParse() {
    var options = {
      value: {
        for: 'Bob'
      },
      properties: {
        for: {
          type: 'string',
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
    });
  });

  it('should parse - no type', function shouldParse() {
    var options = {
      value: {
        for: 'Bob'
      },
      properties: {
        for: {
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
    });
  });



  it('should parse - invalid property type', function shouldParse() {
    var options = {
      value: {
        for: 'Bob'
      },
      properties: {
        for: {
          value: 'Buddy'
        },
        prompt: {
          type: 123231 //@info type must be a string or a function
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.not.exist);
      assert(expect(result).to.exist);
    });
  });


  it('should parse - invalid readOnly', function shouldParse(done) {
    var options = {
      value: {
        for: 'Bob',
        prompt: 'what'
      },
      properties: {
        for: {
          value: 'Buddy'
        },
        prompt: {
          readOnly: 'a' //@info type must be a string or a function
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
      done();
    });
  });


  it('should fail - readOnly', function shouldParse() {

    var options = {
      value: {
        for: 'Bob',
        prompt: 'Hello WORLD'
      },
      properties: {
        for: {
          type: String,
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);
    });

  });

  it('should fail - Invalid Static Type ', function shouldInitialize() {
    var options = {
      value: {
        for: 99
      },
      properties: {
        for: {
          type: String,
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);

    });
  });

  it('should fail - Invalid Dynamic Type ', function shouldInitialize() {
    var options = {
      value: {
        for: 99
      },
      properties: {
        for: {
          type: 'string',
          value: 'Buddy'
        },
        prompt: {
          type: String,
          value: 'Hey %s, What is your name?',
          readOnly: true
        }
      }
    };

    assert(expect(parse).to.exist);

    parse(options, function(err, result) {
      assert(expect(err).to.exist);
      expect(err).to.be.instanceOf(ValidationError);
      assert(expect(result).to.not.exist);

    });
  });
});
