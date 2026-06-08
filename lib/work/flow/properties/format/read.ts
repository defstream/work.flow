'use strict';

interface StateCompleted {
  completed: Record<string, { value?: Record<string, unknown> } | undefined>;
}

function read(stack: string[], state: StateCompleted): unknown {
  const key = stack[0];
  const entry = state.completed[key];
  let object: unknown = entry?.value;

  if (object === undefined || stack.length === 1) {
    return object;
  }

  const rest = stack.slice(1);
  for (const segment of rest) {
    if (object !== null && typeof object === 'object' && segment in (object as Record<string, unknown>)) {
      object = (object as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }
  return object;
}

export = read;
