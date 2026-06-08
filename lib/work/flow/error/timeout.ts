'use strict';

class TimeoutError extends Error {
  readonly code = 408;
  readonly details: unknown;

  constructor(message?: string, details?: unknown) {
    super(message);
    this.name = 'TimeoutError';
    this.message = message!;
    this.details = details;
  }
}

export = TimeoutError;
