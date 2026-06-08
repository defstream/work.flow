'use strict';

import read = require('./read');

interface StateCompleted {
  completed: Record<string, { value?: Record<string, unknown> } | undefined>;
}

function tokenizer(
  this: { state: StateCompleted },
  values: Record<string, unknown>,
  token: string
): Record<string, unknown> {
  const stack = token.split('.');
  const value = read(stack, this.state);
  if (value !== undefined) {
    values[token] = value;
  }
  return values;
}

export = tokenizer;
