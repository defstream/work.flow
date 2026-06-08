'use strict';

import ValidationError = require('../error/validation');

type Callback<T = unknown> = (err: Error | null, result?: T) => void;

interface DefinitionItem {
  uri: string;
  [key: string]: unknown;
}

interface Definitions {
  tasks: Record<string, DefinitionItem>;
  workflows: Record<string, DefinitionItem>;
  paths: Record<string, DefinitionItem>;
  get(uri?: string): DefinitionItem | undefined;
  valid(item?: Partial<DefinitionItem>): boolean;
  exists(uri?: string): boolean;
  addTask(task: Partial<DefinitionItem>, callback?: Callback<DefinitionItem>): void;
  addPath(path: Partial<DefinitionItem>, callback?: Callback<DefinitionItem>): void;
  addWorkflow(workflow: Partial<DefinitionItem>, callback?: Callback<DefinitionItem>): void;
}

const definitions: Definitions = {
  tasks: {},
  workflows: {},
  paths: {},

  get(uri?: string): DefinitionItem | undefined {
    if (!uri) return undefined;
    return this.tasks[uri] ?? this.paths[uri] ?? this.workflows[uri];
  },

  valid(item?: Partial<DefinitionItem>): boolean {
    return !!(item?.uri?.toString().trim());
  },

  exists(uri?: string): boolean {
    return this.get(uri) !== undefined;
  },

  addTask(task: Partial<DefinitionItem>, callback?: Callback<DefinitionItem>): void {
    if (!this.valid(task)) {
      callback?.(new ValidationError('Task must be an object with a uri.'));
      return;
    }
    if (this.exists(task.uri)) {
      callback?.(new ValidationError('This uri has already been defined: ' + task.uri + '.'));
      return;
    }
    this.tasks[task.uri!] = task as DefinitionItem;
    callback?.(null, this.tasks[task.uri!]);
  },

  addPath(path: Partial<DefinitionItem>, callback?: Callback<DefinitionItem>): void {
    if (!this.valid(path)) {
      callback?.(new ValidationError('Path must be an object with a uri.'));
      return;
    }
    if (this.exists(path.uri)) {
      callback?.(new ValidationError('A task with this uri has already been defined: ' + path.uri + '.'));
      return;
    }
    this.paths[path.uri!] = path as DefinitionItem;
    callback?.(null, this.paths[path.uri!]);
  },

  addWorkflow(workflow: Partial<DefinitionItem>, callback?: Callback<DefinitionItem>): void {
    if (!this.valid(workflow)) {
      callback?.(new ValidationError('Path must be an object with a uri.'));
      return;
    }
    if (this.exists(workflow.uri)) {
      callback?.(new ValidationError('A task with this uri has already been defined: ' + workflow.uri + '.'));
      return;
    }
    this.workflows[workflow.uri!] = workflow as DefinitionItem;
    callback?.(null, this.workflows[workflow.uri!]);
  },
};

export = definitions;
