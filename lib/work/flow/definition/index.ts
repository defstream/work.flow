'use strict';

import utils = require('../../../utils');
import schema = require('./schema');
import definitions = require('../definitions');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface IFlow {
  definitions: typeof definitions;
}

function definition(this: IFlow, workdef: unknown, callback?: Callback): void {
  const cb = callback as ((err: Error) => void) | undefined;
  if (utils.check(workdef).against(schema).using(cb).failed) return;
  this.definitions.addWorkflow(
    workdef as Parameters<typeof definitions.addWorkflow>[0],
    callback
  );
}

export = definition;
