'use strict';

import utils = require('../../../../utils');
import schema = require('./schema');
import definitions = require('../../definitions');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface IFlow {
  definitions: typeof definitions;
}

function definition(this: IFlow, pathdef: unknown, callback?: Callback): void {
  const cb = callback as ((err: Error) => void) | undefined;
  if (utils.check(pathdef).against(schema).using(cb).failed) return;
  this.definitions.addPath(
    pathdef as Parameters<typeof definitions.addPath>[0],
    callback
  );
}

export = definition;
