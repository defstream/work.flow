'use strict';

import utils = require('../../../utils');
import ValidationError = require('../error/validation');
import schema = require('./schema');
import propertySchema = require('./property-schema');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface PropertyDef {
  value?: unknown;
  type?: string | ((...args: unknown[]) => unknown);
  readOnly?: boolean;
}

interface ParseOptions {
  value: Record<string, unknown>;
  properties: Record<string, PropertyDef>;
}

function parseProperties(
  options: ParseOptions,
  callback?: Callback<Record<string, unknown>>
): void {
  const cb = callback as ((err: Error) => void) | undefined;
  if (utils.check(options).against(schema).using(cb).failed) return;

  const result: Record<string, unknown> = {};
  const { value, properties } = options;

  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (properties[key]) {
      if (utils.check(properties[key]).against(propertySchema).using(cb).failed) return;

      if (properties[key].readOnly) {
        callback?.(new ValidationError('Attempted to modify read-only property'));
        return;
      }

      const propType = properties[key].type;
      if (propType !== undefined) {
        if (typeof propType === 'function') {
          if (typeof value[key] !== typeof (propType as () => unknown)()) {
            callback?.(
              new ValidationError(
                'Expected Type ' +
                  typeof (propType as () => unknown)() +
                  ', actually ' +
                  typeof value[key]
              )
            );
            return;
          }
        } else if (typeof propType === 'string') {
          if (typeof value[key] !== propType) {
            callback?.(
              new ValidationError(
                'Expected type ' + propType + ', actually ' + typeof value[key]
              )
            );
            return;
          }
        }
      }
      result[key] = value[key];
    }
  }

  Object.keys(properties).reduce((acc, key) => {
    const prop = properties[key];
    if (acc[key] === undefined && prop.value !== undefined) {
      acc[key] = prop.value;
    }
    return acc;
  }, result);

  callback?.(null, result);
}

export = parseProperties;
