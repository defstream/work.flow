var taskDefinition = require('./task/definition');
var pathDefinition = require('./path/definition');
var workflowDefinition = require('./definition');

var flow = {
  task: {

  },
  path: {

  }
};

Object.defineProperty(flow.task, 'definition', {
  value: taskDefinition.bind(flow)
});

Object.defineProperty(flow.path, 'definition', {
  value: pathDefinition.bind(flow)
});

Object.defineProperty(flow, 'definition', {
  value: workflowDefinition.bind(flow)
});



module.exports = {

};
