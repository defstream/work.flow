var utils = require('../../../../utils');

var ValidationError = require('../../error/validation');
var varse = require('varse');

varse.configure({
  delims: ['{', '}'] // Default: ['{{', '}}']
});

var tokens = require('./tokens');
var tokenizer = require('./tokenizer');

module.exports = function replace(property, state) {
  var result = property;
  var ens = tokens(property);
  if (!ens.length) {
    return property;
  }

  var values = ens.reduce(tokenizer.bind({
    state: state
  }), {});
  return varse(result, values);
};
