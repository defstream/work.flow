'use strict';

class ValidationError extends Error {
  readonly code = 400;
  readonly details: unknown;

  constructor(message?: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.message = message!;
    this.details = details;
  }
}

export = ValidationError;
