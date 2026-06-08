## work.flow - The asynchronous workflow library for Node

<p align="center">
  <a href="https://npmjs.com/package/work.flow"><img src="https://img.shields.io/npm/v/work.flow.svg" alt="npm version"></a>
  <a href="https://github.com/defstream/work.flow/actions/workflows/ci.yml"><img src="https://github.com/defstream/work.flow/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://npm-stat.com/charts.html?package=work.flow"><img src="https://img.shields.io/npm/dm/work.flow.svg" alt="downloads"></a>
</p>

<p align="center">
  <img src="https://raw.github.com/defstream/work.flow/master/logo.png" alt="work.flow logo">
</p>

**work.flow** is an asynchronous workflow library for Node.

The current version is 0.0.0 and is still going through documentation and testing before development starts, **Unless you are contributing, you should probably not be using this.**

The purpose of work.flow is to provide a means of creating individual pieces of code that can be used to quickly create applications or data processing pipelines.

**More Information**
- Flow-based Programming https://www.jpaulmorrison.com/fbp/
- Flow-based programming https://en.wikipedia.org/wiki/Flow-based_programming


### TLDR;

All `Workflow` instances share a single global definitions registry — creating `new Workflow()` in multiple files is safe, and importing a file as a side effect registers its definitions into the shared registry before `run` is called.

**print-line.ts**

```typescript
import Workflow = require('work.flow');

const work = new Workflow();

work.flow.task.definition({
  uri: 'incredi.co/games/worlds-fastest-game/print-line',
  properties: {
    message: { type: String, value: '' }
  }
});
```

**ask-name.ts**

```typescript
import Workflow = require('work.flow');

const work = new Workflow();

work.flow.task.definition({
  uri: 'incredi.co/games/worlds-fastest-game/ask-name',
  properties: {
    for:    { type: String, value: 'Buddy' },
    prompt: { type: String, value: 'Hey %s, What is your name?', readOnly: true }
  }
});
```

**ask-for-player-names.ts**

```typescript
import Workflow = require('work.flow');
import './ask-name';

const work = new Workflow();

work.flow.path.definition({
  uri: 'incredi.co/games/worlds-fastest-game/paths/ask-for-player-names',
  start: [
    { name: 'player-one', uri: 'incredi.co/games/worlds-fastest-game/ask-name', properties: { for: 'Player 1' } },
    { name: 'player-two', uri: 'incredi.co/games/worlds-fastest-game/ask-name', properties: { for: 'Player 2' } }
  ],
  timeout: 6000,
  error: [{ uri: 'work.flow/task/restart' }]
});
```

**workflow.ts**

```typescript
import Workflow = require('work.flow');
import './print-line';
import './ask-for-player-names';

const work = new Workflow();

work.flow.definition({
  name: 'worlds-fastest-game',
  uri: 'incredi.co/games/worlds-fastest-game',
  start: [
    { name: 'ask-names', uri: 'incredi.co/games/worlds-fastest-game/paths/ask-for-player-names' },
    {
      name: 'determine-winner',
      uri: 'work.flow/task/if-then-else',
      properties: {
        if: {
          equals: 1,
          then: [{ name: 'player-one-wins', uri: 'incredi.co/games/worlds-fastest-game/print-line', properties: { message: '{ask-names.player-one} WINS!!!!' } }],
          else: [{ name: 'player-two-wins', uri: 'incredi.co/games/worlds-fastest-game/print-line', properties: { message: '{ask-names.player-two} WINS!!!!' } }]
        }
      }
    },
    { uri: 'work.flow/workflow/restart' }
  ],
  timeout: 6000,
  error: [{ uri: 'work.flow/workflow/restart' }]
});
```

**index.ts**

```typescript
import Workflow = require('work.flow');
import './workflow'; // registers all definitions as a side effect

const work = new Workflow();

work.flow.run({}, (err: Error | null) => {
  console.log('MUAHAHAHAHAHAHAHAH');
});
```

# Installation

```shell
npm install work.flow
```

# API Reference

### `new Workflow()`

Returns a `Workflow` instance. All instances share the same global definitions registry.

```typescript
import Workflow = require('work.flow');
const work = new Workflow();
```

---

### `work.flow.task.definition(def, callback?)`

Registers a task definition in the global registry.

| Field | Type | Required | Description |
|---|---|---|---|
| `uri` | `string` | yes | Unique identifier for the task |
| `name` | `string` | no | Human-readable name |
| `properties` | `object` | no | Input property descriptors |
| `error` | `array` | no | Error handler URIs |
| `timeout` | `number` | no | Timeout in milliseconds |

---

### `work.flow.path.definition(def, callback?)`

Registers a path definition. Paths group tasks that run in parallel.

Same fields as `task.definition`, plus:

| Field | Type | Required | Description |
|---|---|---|---|
| `start` | `object[]` | no | Tasks/paths to run at path start |

---

### `work.flow.definition(def, callback?)`

Registers a workflow definition.

Same fields as `path.definition`.

---

### `work.flow.definitions`

The global definitions registry. Methods:

```typescript
work.flow.definitions.addTask(def, callback?)
work.flow.definitions.addPath(def, callback?)
work.flow.definitions.addWorkflow(def, callback?)
work.flow.definitions.get(uri)     // → definition | undefined
work.flow.definitions.exists(uri)  // → boolean
work.flow.definitions.valid(def)   // → boolean
```

---

### `work.flow.run(options, callback?)`

Initiates a workflow run. Calls `callback(null)` on success.

---

### `WorkflowState`

Tracks execution state for named steps within a run. Each step must be started before it can be completed or failed.

```typescript
import WorkflowState = require('work.flow/lib/work/flow/state');

const state = new WorkflowState();

state.start('step-a', (err) => { /* started */ });
state.complete('step-a', (err) => { /* completed */ });
state.fail('step-a', (err) => { /* marked as failed */ });

// Wait for one or more steps to complete (supports optional timeout)
state.awaits({ names: ['step-a', 'step-b'], timeout: 5000 }, (err) => {
  // err is TimeoutError if timeout expires before all names complete
});
```

---

### Error Classes

| Class | Code | Import |
|---|---|---|
| `ValidationError` | 400 | `work.flow/lib/work/flow/error/validation` |
| `NotFoundError` | 404 | `work.flow/lib/work/flow/error/not-found` |
| `TimeoutError` | 408 | `work.flow/lib/work/flow/error/timeout` |
| `ExecutionError` | 500 | `work.flow/lib/work/flow/error/execution` |

All error classes extend `Error` and accept an optional `message` and `details` argument.

---

# Development Scripts

Install dependencies first:

```shell
npm install
```

#### Test

```shell
npm test
```

#### Build

Compiles TypeScript to `./dist` with declaration files and source maps.

```shell
npm run build
```

#### Clean

```shell
npm run clean
```

### Discuss

Questions or comments can be posted on the <a href="https://github.com/defstream/work.flow/issues">work.flow GitHub issues page</a>.

### Maintainers
Hector Gray (<a href="https://x.com/defstream">@defstream</a>)

### Contribute
Pull Requests welcome. Please make sure all tests pass:

```shell
$ npm test
```

Please submit <a href="https://github.com/defstream/work.flow/issues">GitHub issues</a> for any feature enhancements, bugs or documentation problems.

### License
MIT
