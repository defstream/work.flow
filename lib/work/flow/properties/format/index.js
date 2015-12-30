var utils = require('../../../../utils');

var schema = require('./schema');
var replace = require('./replace');

module.exports = function formatProperties(options, callback) {
  if (utils.check(options).against(schema).using(callback).failed) return;

  //@info if any property contains a string send to checkForTokens
  Object.keys(options.properties).forEach(function(key) {
    var property = options.properties[key];

    if (typeof property === 'string') {
      options.properties[key] = replace(options.properties[key],
        options.state);
    }
  });
  return callback && callback(null, options.properties);
};
