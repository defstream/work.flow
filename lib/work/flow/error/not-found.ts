'use strict';

class NotFoundError extends Error {
  readonly code = 404;
  readonly details: unknown;

  constructor(message?: string, details?: unknown) {
    super(message);
    this.name = 'NotFoundError';
    this.message = message!;
    this.details = details;
  }
}

export = NotFoundError;
