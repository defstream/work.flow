'use strict';

import utils = require('../../../../utils');
import schema = require('./schema');
import definitions = require('../../definitions');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface IFlow {
  definitions: typeof definitions;
}

function definition(this: IFlow, taskdef: unknown, callback?: Callback): void {
  const cb = callback as ((err: Error) => void) | undefined;
  if (utils.check(taskdef).against(schema).using(cb).failed) return;
  this.definitions.addPath(
    taskdef as Parameters<typeof definitions.addPath>[0],
    callback
  );
}

export = definition;
