/*jslint node: true */
/*global module, require*/
'use strict';

/**
 * returns a property object
 * @param  {*}        value
 * @param  {Boolean}  enumerable If this property should be visible when printed.
 * @return {Object}
 */
module.exports = function property(value, enumerable) {
  return {
    enumerable: !!enumerable,
    value: value
  };
};
