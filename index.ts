'use strict';

import flow = require('./lib/work/flow');

type IFlow = typeof flow;

class Workflow {
  readonly flow: IFlow;

  constructor(_options?: unknown) {
    this.flow = flow;
  }
}

export = Workflow;
