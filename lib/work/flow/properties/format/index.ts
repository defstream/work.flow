'use strict';

import utils = require('../../../../utils');
import replace = require('./replace');
import schema = require('./schema');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;
type StateArg = Parameters<typeof replace>[1];

interface FormatOptions {
  properties: Record<string, unknown>;
  state: Record<string, unknown>;
  value?: unknown;
}

function formatProperties(
  options: FormatOptions,
  callback?: Callback<Record<string, unknown>>
): void {
  const cb = callback as ((err: Error) => void) | undefined;
  if (utils.check(options).against(schema).using(cb).failed) return;

  Object.keys(options.properties).forEach(key => {
    const property = options.properties[key];
    if (typeof property === 'string') {
      options.properties[key] = replace(
        property,
        options.state as unknown as StateArg
      );
    }
  });

  callback?.(null, options.properties);
}

export = formatProperties;
