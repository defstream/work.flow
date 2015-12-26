/*jslint node: true */
/*global module, require*/
'use strict';

var Joi = require('joi');

function error(validation) {
  if (validation.error) {
    return new Error(validation.error.annotate());
  }
}

module.exports = {
  /**
   * creates a property object
   * @param  {*}        value
   * @param  {Boolean}  enumerable If this property should be visible when printed.
   * @return {Object}
   */
  property: function createProperty(value, enumerable) {
    return {
      enumerable: !!enumerable,
      value: value
    };
  },
  check: function(obj) {
    return {
      against: function(schema) {
        var err = schema && error(
          Joi.validate(obj, schema, {
            abortEarly: false
          })
        );
        return {
          throwIfFailed: function() {
            if (err) {
              throw err;
            }
            return err;
          },
          with: function(callback) {
            var result = {
              failed: err && true || false
            };
            if (result.failed) {
              if (!callback) {
                throw err;
              }
              return callback && callback(err) && result || result;
            }
            return result;
          }
        };
      }
    };
  }
};
