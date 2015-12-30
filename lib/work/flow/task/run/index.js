/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = function(options, callback) {
  return callback && callback(null);
};
//@info ACTION PLAN
//@info options = {
//@info   name:,
//@info   awaits:,
//@info   context:,
//@info   timeout:,
//@info   workflow:,
//@info   properties:,
//@info   definition: { properties:, task:, uri: }
//@info }
//@info 1. emit started event
//@info 2. ensure there is a definition.task to run or return & emit validation error
//@info 3. infer awaits from proeprties & upsert the awaits array, validate awaited tasks have been registered or return & emit validation error
//@info 4. if some are still executing, subscribe to the complete events before executing and emit awaiting event
//@info 5. parse properties
//@info 6. format properties
//@info 7. execute definition.task passing in name, context, properties
//@info 8. when complete either return & emit execution error if failed, or set the result

//@info RETURNS
// Task<events.Emitter> = {
//   name:,
//   properties:,
//   status:,
//   value:,
//   erorr:,
// }
