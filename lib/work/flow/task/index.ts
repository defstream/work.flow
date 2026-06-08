'use strict';

import utils = require('../../../utils');
import parse = require('../properties/parse');
import format = require('../properties/format');
import schema = require('./schema');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface TaskOptions {
  name: string;
  awaits?: string[];
  state: {
    awaits(opts: { names: string[]; timeout?: number }, cb: Callback): void;
  };
  context?: Record<string, unknown>;
  timeout?: number;
  definition: {
    task: (opts: Record<string, unknown>, cb: Callback) => void;
    properties?: Record<string, unknown>;
  };
  properties?: Record<string, unknown>;
  workflow?: unknown;
  task(opts: Record<string, unknown>, cb: Callback): void;
}

function readProperties(
  options: Pick<TaskOptions, 'state' | 'context' | 'definition' | 'properties'>,
  callback: Callback<Record<string, unknown>>
): void {
  parse(
    {
      value: (options.properties ?? {}) as Record<string, unknown>,
      properties: (options.definition.properties ?? {}) as Record<
        string,
        { value?: unknown; type?: string | (() => unknown); readOnly?: boolean }
      >,
    },
    (err, properties) => {
      if (err) {
        callback(err);
        return;
      }
      format(
        {
          state: options.state as unknown as Record<string, unknown>,
          properties: (properties ?? {}) as Record<string, unknown>,
        },
        callback
      );
    }
  );
}

function createTask(options: TaskOptions, callback?: Callback): object {
  if (
    utils
      .check(options)
      .against(schema)
      .using(callback as ((err: Error) => void) | undefined).failed
  ) {
    return {};
  }

  const task = {
    status: 'created',
    value: undefined as unknown,
    error: undefined as unknown,
    emit(_event: string, ..._args: unknown[]): void {
      // EventEmitter integration not yet implemented
    },
  };

  setImmediate(() => {
    task.emit('started', options);
    options.state.awaits(
      { names: options.awaits ?? [], timeout: options.timeout },
      err => {
        if (err) {
          task.error = err;
          task.emit('error', err);
          callback?.(err);
          return;
        }
        readProperties(options, (propErr, properties) => {
          if (propErr) {
            task.error = propErr;
            task.emit('error', propErr);
            callback?.(propErr);
            return;
          }
          options.task(
            {
              name: options.name,
              context: options.context ?? {},
              properties: properties ?? {},
            },
            (runErr, result) => {
              if (runErr) {
                task.status = 'completed';
                task.error = runErr;
                task.emit('error', runErr);
                callback?.(runErr);
              } else {
                task.status = 'completed';
                task.value = result;
                task.emit('data', result);
                setImmediate(() => task.emit('end'));
                callback?.(null, result);
              }
            }
          );
        });
      }
    );
  });

  return task;
}

export = createTask;
