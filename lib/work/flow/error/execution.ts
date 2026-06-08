'use strict';

class ExecutionError extends Error {
  readonly code = 500;
  readonly details: unknown;

  constructor(message?: string, details?: unknown) {
    super(message);
    this.name = 'ExecutionError';
    this.message = message!;
    this.details = details;
  }
}

export = ExecutionError;
