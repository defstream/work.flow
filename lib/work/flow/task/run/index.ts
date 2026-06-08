'use strict';

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

function runTask(_options: unknown, callback?: Callback): void {
  callback?.(null);
}

export = runTask;
