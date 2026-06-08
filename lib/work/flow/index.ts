'use strict';

import runFlow = require('./run');
import workflowDefinition = require('./definition');
import definitions = require('./definitions');
import taskDefinition = require('./task/definition');
import pathDefinition = require('./path/definition');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface IFlow {
  task: {
    definition(taskdef: unknown, callback?: Callback): void;
  };
  path: {
    definition(pathdef: unknown, callback?: Callback): void;
  };
  run: typeof runFlow;
  definition(workdef: unknown, callback?: Callback): void;
  definitions: typeof definitions;
}

const flow: IFlow = {
  task: {
    definition(taskdef, callback) {
      taskDefinition.call(flow, taskdef, callback);
    },
  },
  path: {
    definition(pathdef, callback) {
      pathDefinition.call(flow, pathdef, callback);
    },
  },
  run: runFlow,
  definition(workdef, callback) {
    workflowDefinition.call(flow, workdef, callback);
  },
  definitions,
};

export = flow;
