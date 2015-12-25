/*jslint node: true */
/*global module, require*/
'use strict';

module.exports = {
  /**
   * creates a property object
   * @param  {*}        value
   * @param  {Boolean}  enumerable If this property should be visible when printed.
   * @return {Object}
   */
  property: function createProperty(value, enumerable) {
    return {
      enumerable: enumerable,
      value: value
    };
  }
};
