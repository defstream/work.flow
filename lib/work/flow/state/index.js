/*jslint node: true */
/*global module, require*/
'use strict';

var State = {
  hasRun: require('./has-run'),
  hasBegun: require('./has-begun'),
  hasFinished: require('./has-finished'),
  start: require('./start'),
  complete: require('./complete'),
  fail: require('./fail'),
  notify: require('./notify'),
  removeListener: require('./remove-listener'),
  listen: require('./listen'),
  awaits: require('./awaits'),
  allCompleted: require('./all-completed'),
  allStarted: require('./all-started'),
};


module.exports = function createState() {
  return Object.create(State, {
    listeners: {
      value: []
    },
    state: {
      enumerable: true,
      value: {
        started: {

        },
        completed: {

        }
      }
    }
  });
};
