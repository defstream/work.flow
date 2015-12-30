## work.flow - The asynchronous workflow library for Node

<p align="center">
   <a href="http://npmjs.com/package/work.flow"><img src="https://img.shields.io/npm/v/work.flow.svg"
        alt="npm version"></a>

  <a href="https://gemnasium.com/defstream/work.flow"><img src="https://img.shields.io/gemnasium/defstream/work.flow.svg"
       alt="Gemnasium"></a>

  <a href="https://travis-ci.org/defstream/work.flow"><img src="https://img.shields.io/travis/defstream/work.flow.svg"
       alt="build status"></a>

  <a href="https://codecov.io/github/defstream/work.flow"><img src="https://img.shields.io/codecov/c/github/defstream/work.flow.svg"
        alt="coverage"></a>

  <a href="https://circleci.com/gh/defstream/work.flow"><img src="https://img.shields.io/circleci/project/defstream/work.flow.svg"
       alt="coverage"></a>

  <a href="https://snyk.io/test/npm/work.flow"><img src="https://snyk.io/test/npm/work.flow/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/npm/name style="max-width:100%;"></a>

  <a href="http://npm-stat.com/charts.html?package=work.flow"><img src="https://img.shields.io/npm/dm/work.flow.svg" alt="downloads"></a>

</p>

<p align="center">
  <a href="https://gitter.im/defstream/work.flow"><img src="https://img.shields.io/gitter/room/defstream/work.flow.svg"
     alt="Chat"></a>
</p>

<p align="center">
  <img src="https://raw.github.com/defstream/work.flow/master/logo.png">
</p>

**work.flow** is an asynchronous workflow library for Node.

The current version is 0.0.0 and is still going through documentation and testing before development starts, **Unless you are contributing, you should probably not be using this.**

The purpose of work.flow is to provide a means of creating individual pieces of code that can be used to quickly create applications or data processing pipelines.

**More Information**
- Flow-based Programming http://www.jpaulmorrison.com/fbp/
- Flow-based programming https://en.wikipedia.org/wiki/Flow-based_programming


### TLDR;

**print-line.js**

```javascript
var work = require('work.flow');

module.exports = work.flow.task.definition({
	uri: 'incredi.co/games/worlds-fastest-game/print-line',
	properties: {
		message: {
			type: String,
			value: ''
		}
	},
	task: function(options, complete) {
		var message = options.properties.message;
		console.log(message);
		return complete(null, message);
	}
});

```

**ask-name.js**

```javascript

var util = require('util');
var work = require('work.flow');
var readline = require('readline');

var io = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

module.exports = work.flow.task.definition({
	uri: 'incredi.co/games/worlds-fastest-game/ask-name',
	properties: {
		for: {
			type: String,
			value: 'Buddy'
		},
		prompt: {
			type: String,
			value: 'Hey %s, What is your name?',
			readOnly: true
		}
	},
	task: function(options, complete) {
		var prompt = util.format(options.properties.prompt, options.properties.for);
		return io.question(prompt, function(name) {
			return complete(null, name);
		});
	}
});

```

**ask-for-player-names.js**

```javascript
var work = require('work.flow');

require('./ask-name');

module.exports = work.flow.path.definition({
	uri: 'incredi.co/games/worlds-fastest-game/paths/ask-for-player-names',
	start: [{
		name: 'player-one',
		uri: 'incredi.co/games/worlds-fastest-game/ask-name',
		properties: {
			for: 'Player 1'
		}
	}, {
		name: 'player-two',
		uri: 'incredi.co/games/worlds-fastest-game/ask-name',
		properties: {
			for: 'Player 2'
		}
	}],
	timeout: 6000,
	error: [{
		uri: 'work.flow/task/restart'
	}]
});

```

**workflow.js**

```javascript
var work = require('work.flow');

require('./print-line');
require('./ask-for-player-names');

module.exports = work.flow.definition({
	name: 'worlds-fastest-game',
	uri: 'incredi.co/games/worlds-fastest-game',
	start: [{
		name: 'ask-names',
		uri: 'incredi.co/games/worlds-fastest-game/paths/ask-for-player-names'
	}, {
		name: 'determine-winner',
		uri: 'work.flow/task/if-then-else',
		properties: {
			if: {
				value: function(options, callback) {
          //@info return a random number between 1 & 2.
					return callback(null, Math.round(Math.random() * (2 - 1) + 1));
				},
				equals: 1,
				then: [{
					name: 'player-one-wins',
					uri: 'incredi.co/games/worlds-fastest-game/print-line',
					properties: {
						message: '{ask-names.player-one} WINS!!!!'
					}
				}],
				else: [{
					name: 'player-two-wins',
					uri: 'incredi.co/games/worlds-fastest-game/print-line',
					properties: {
						message: '{ask-names.player-two} WINS!!!!'
					}
				}]
			}
		}
	}, {
		uri: 'work.flow/workflow/restart'
	}],
	timeout: 6000,
	error: [{
		uri: 'work.flow/workflow/restart'
	}]
});

```

**index.js**

```javascript
var workflow = require('./workflow');

//@info lets run the worlds fastest game
workflow.run(function(err, context){
  //@info The worlds fastest game is also the longest
  //      If you take a close look at the work flow
  //      It will never actually end...
  console.log('MUAHAHAHAHAHAHAHAH');
});


```

# Installation

```shell
$ npm install work.flow --save
```

# Development Scripts
Before running any development scripts, be sure to first install the dev modules.

```shell
$ npm install work.flow --save --dev
```

#### Build Documentation
Outputs code documentation files to the `./doc/api` folder.

```shell
$ npm run doc
```

#### Static Analysis
Outputs static analysis files to the `./doc/analysis` folder.

```shell
$ npm run analyze
```

#### Test + Coverage
Outputs code coverage files to the `./doc/coverage` folder.

```shell
$ npm run test
```

**CURRENT COVERAGE REPORT**

![codecov.io](https://codecov.io/github/defstream/work.flow/branch.svg?branch=master)

### Discuss
Chat channel:    <a href="https://gitter.im/defstream/work.flow"><img src="https://img.shields.io/gitter/room/defstream/work.flow.svg" alt="Chat"></a>

Twitter: Follow <a href="https://twitter.com/defstream">@defstream</a>

Questions or comments can also be posted on the work.flow Github issues page.

### Maintainers
Hector Gray (Twitter: @defstream)

### Contribute
Pull Requests welcome. Please make sure all tests pass:

```shell
$ npm test
```

Please submit Github issues for any feature enhancements, bugs or documentation problems.

### License
MIT
