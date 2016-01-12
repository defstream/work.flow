/*jslint node: true */
/*global module, require*/
'use strict';
var utils = require('../../../utils');

var schema = require('./schema');

var Task = {
  started: function(err, callback) {
    var self = this;
    self.status = 'started';
    self.emit('started');
  },
  failed: function(err, callback) {
    var self = this;
    self.status = 'completed';
    self.error = err;
    self.emit('error', this.err);
    setImmediate(function() {
      self.emit('end');
    });
    return callback && callback(err);
  },
  completed: function(value, callback) {
    var self = this;
    self.status = 'completed';
    self.value = value;
    self.emit('data', this.value);
    setImmediate(function() {
      self.emit('end');
    });
    return callback && callback(null, this.value);
  }

};

function readProperties(options, callback) {
  return parse({
    value: options.properties,
    properties: options.definition
  }, function(err, properties) {
    if (err) {
      return callback && callback(err);
    }
    return format({
      state: options.state,
      properties: properties,
      context: options.context,
    }, callback);
  });
}

module.exports = function(options, callback) {
  //@info 1. ensure there is a definition.task to run or return & emit validation error
  if (utils.check(options).against(schema).using(callback).failed) return;

  var task = Object.create(Task);
  var opts = {
    name: options.name,
    state: options.state,
    context: options.context,
    definition: options.definition,
    properties: options.properties
  };

  //@info 2. parse properties
  //@info 3. format properties
  setImmediate(function() {
    task.emit('started', opts);
    options.state.awaits({
      names: options.awaits || [],
      timeout: options.timeout
    }, function(err, result) {
      readProperties(opts,
        function(err, properties) {
          if (err) {
            task.error = err;
            task.emit('error', err);
            return callback && callback(err);
          }
          //@info 4. execute definition.task passing in name, context, properties
          options.task({
            name: options.name,
            context: options.context,
            properties: properties,
          }, function(err, result) {
            //@info 5. when complete either return & emit execution error if failed, or set the result
            if (err) {
              return task.failed(err, callback);
            }
            return task.completed(result, callback);
          });
        });
    });
  });

  return task;
};

/*
name: Joi.string().description('name must be a valid string'),
  awaits: Joi.array().items(Joi.string()).optional().description(
    'awaits must be a valid array of strings.'
  ),
  properties: Joi.object().optional().description(
    'properties must be an object'
  ),
  context: Joi.object().optional().description('context must be an object'),
  timeout: Joi.number().min(0).optional().description(
    'timeout must be a valid Number'
  ),
  workflow: Joi.object().required().description(
    'workflow must be an object'
  ),
  definition: Joi.object().required().description(
    'definition must be an object'
  ).keys({
    task: Joi.func().required().description(
      'defintion.task is a required function'
    )
  })
*/
