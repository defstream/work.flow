'use strict';

import tokens = require('./tokens');
import tokenizer = require('./tokenizer');

interface StateCompleted {
  completed: Record<string, { value?: Record<string, unknown> } | undefined>;
}

function applyTemplate(template: string, values: Record<string, unknown>): string {
  return template.replace(/{([^{}]+)}/g, (match, key) =>
    key in values ? String(values[key]) : match
  );
}

function replace(property: string, state: StateCompleted): string {
  const ens = tokens(property);
  if (!ens.length) {
    return property;
  }
  const values = ens.reduce(tokenizer.bind({ state }), {} as Record<string, unknown>);
  return applyTemplate(property, values);
}

export = replace;
