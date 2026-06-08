'use strict';

import ExecutionError = require('../error/execution');
import TimeoutError = require('../error/timeout');

type Callback<T = void> = (err: Error | null, result?: T) => void;
type StateListener = (name: string) => void;

interface StateData {
  started: Record<string, boolean>;
  completed: Record<string, { value?: unknown; error?: unknown }>;
}

interface AwaitOptions {
  names: string[];
  timeout?: number;
}

class WorkflowState {
  listeners: StateListener[] = [];
  state: StateData = {
    started: {},
    completed: {},
  };

  hasRun(name: string): boolean {
    return (
      this.state.started[name] !== undefined ||
      this.state.completed[name] !== undefined
    );
  }

  hasBegun(name: string): boolean {
    return this.state.started[name] !== undefined;
  }

  hasFinished(name: string): boolean {
    return this.state.completed[name] !== undefined;
  }

  allCompleted(names: string[]): boolean {
    return names.every(name => this.hasFinished(name));
  }

  allStarted(names: string[]): boolean {
    return names.every(name => this.hasBegun(name));
  }

  start(name: string, callback?: Callback): void {
    if (this.hasRun(name)) {
      callback?.(new ExecutionError('An item with this name has already started.'));
      return;
    }
    this.state.started[name] = true;
    callback?.(null);
  }

  complete(name: string, value?: unknown, callback?: Callback): void {
    if (typeof value === 'function') {
      callback = value as Callback;
      value = undefined;
    }
    if (!this.hasBegun(name)) {
      callback?.(new ExecutionError('An item with this name has not yet started.'));
      return;
    }
    if (this.hasFinished(name)) {
      callback?.(new ExecutionError('An item with this name has already completed.'));
      return;
    }
    this.state.completed[name] = { value };
    this.notify(name, callback);
  }

  fail(name: string, error?: unknown, callback?: Callback): void {
    if (typeof error === 'function') {
      callback = error as Callback;
      error = undefined;
    }
    if (!this.hasBegun(name)) {
      callback?.(new ExecutionError('An item with this name has not yet started.'));
      return;
    }
    if (this.hasFinished(name)) {
      callback?.(new ExecutionError('An item with this name has already completed.'));
      return;
    }
    this.state.completed[name] = { error };
    callback?.(null);
  }

  notify(name: string, callback?: Callback): void {
    for (const listener of this.listeners) {
      listener(name);
    }
    callback?.(null);
  }

  removeListener(listener: StateListener): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  listen(options: AwaitOptions, callback?: Callback): StateListener {
    const names = options.names.slice();

    const listener: StateListener = (name: string) => {
      const index = names.indexOf(name);
      if (index > -1) {
        names.splice(index, 1);
      }
      if (names.length === 0) {
        this.removeListener(listener);
        callback?.(null);
      }
    };

    const timeout = parseInt(String(options.timeout ?? ''));
    if (!Number.isNaN(timeout)) {
      setTimeout(() => {
        this.removeListener(listener);
        callback?.(
          new TimeoutError(
            `Execution exceeded timeout of ${options.timeout}ms.`
          )
        );
      }, timeout);
    }

    this.listeners.push(listener);
    return listener;
  }

  awaits(options: AwaitOptions | unknown, callback?: Callback): void {
    if (!options || !Array.isArray((options as AwaitOptions).names)) {
      callback?.(
        new ExecutionError(
          'Invalid arguments, options.names is required and expected to be a string array.'
        )
      );
      return;
    }

    const awaitOptions = options as AwaitOptions;

    if (!awaitOptions.names.length || this.allCompleted(awaitOptions.names)) {
      callback?.(null);
      return;
    }

    if (!this.allStarted(awaitOptions.names)) {
      callback?.(new ExecutionError('Attempting await a name that has yet started.'));
      return;
    }

    this.listen(awaitOptions, callback);
  }
}

export = WorkflowState;
