var utils = require('../../../utils');

var ValidationError = require('../error/validation');

var schema = require('./schema');
var propertySchema = require('./property-schema');

module.exports = function parseProperties(options, callback) {
  if (utils.check(options).against(schema).using(callback).failed) return;

  var result = {};

  var value = options.value;
  var properties = options.properties;

  //@info 1. Iterate through the value and determine if the value is a property.
  var keys = Object.keys(value);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (properties[key]) {
      if (utils.check(properties[key]).against(propertySchema).using(callback)
        .failed) return;

      //@info: if this is a readonly property do not map a value.
      if (properties[key].readOnly) {
        return callback && callback(new ValidationError(
          'Attempted to modify read-only property'));
      }
      //@info: if a type is specified, validate it.
      if (properties[key].type) {
        if (typeof properties[key].type === 'function') {
          if (typeof value[key] !== typeof properties[key].type()) {
            return callback && callback(new ValidationError(
              'Expected Type ' +
              typeof properties[
                key]
              .type() + ', actually ' + typeof value[key]));
          }
        } else {
          if (typeof value[key] !== properties[key].type) {
            return callback && callback(new ValidationError(
              'Expected type ' +
              typeof properties[
                key]
              .type + ', actually ' + typeof value[key]));
          }
        }
      }
      result[key] = value[key];
    }
  }

  //@info 2. Apply defaults for missing and readOnly properties.
  Object.keys(properties).reduce(function applyDefaults(result, key) {
    var property = properties[key];
    if (!result[key] && property.value) {
      result[key] = property.value;
    }
    return result;
  }, result);

  //@info 3. Return the result
  return callback && callback(null, result);
};
