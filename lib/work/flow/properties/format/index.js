var utils = require('../../../../utils');

var ValidationError = require('../../error/validation');
var varse = require('varse');

varse.configure({
  delims: ['{', '}'] // Default: ['{{', '}}']
});

var schema = require('./schema');

function replace(property, state) {
  var result = property;
  var ens = tokens(property);
  if (!ens.length) {
    return property;
  }

  var values = ens.reduce(tokenizer.bind({
    state: state
  }), {});
  console.log(result, values);
  return varse(result, values);
}
var TOKENS = /{([^{}]+)}/g;

function tokens(text) {
  var match = text.match(TOKENS);
  if (!match) {
    return [];
  }
  return match.map(function(i) {
    return i.substring(1, i.length - 1);
  });
}

function tokenizer(values, token) {
  var stack = token.split('.');
  var value = read(stack, this.state);
  if (value !== undefined) {
    values[token] = value;
  }

  return values;
}

function read(stack, state) {
  var key = stack[0];
  var object = state.completed[key] && state.completed[key].value;
  if (!object || stack.length === 1) {
    return object;
  }
  stack = stack.slice(1);
  for (var i = 0; i < stack.length; i++) {
    if (object[stack[i]]) {
      object = object[stack[i]];
    } else {
      return undefined;
    }
  }
  return object;
}

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
