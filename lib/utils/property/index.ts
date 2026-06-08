'use strict';

interface PropDescriptor<T> {
  enumerable: boolean;
  value: T;
}

function property<T>(value?: T, enumerable?: boolean): PropDescriptor<T | undefined> {
  return {
    enumerable: !!enumerable,
    value,
  };
}

export = property;
