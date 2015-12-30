module.exports = function read(stack, state) {
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
};
