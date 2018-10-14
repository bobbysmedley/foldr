/**
 * Exports the `has` function.
 * @since 10/13/18
 * @file
 */

import curry from '@foldr/curry';

const { hasOwnProperty } = Object.prototype;

/**
 * A functional version of Object.prototype.hasOwnProperty.
 * @param {*} property The property to assert membership.
 * @param {*} thing The thing to determine membership of `property`.
 * @returns {boolean} True if `thing` has it's own property `property`.
 * @example
 * has('foo', { foo: 1 });  // true
 * has('foo', { bar: 1 });  // false
 *
 * const hasName = has('name');
 * hasName({ name: 'John' }); // true
 * hasName({});               // false
 */
function has(property, thing) {
  return hasOwnProperty.call(thing, property);
}

export default curry(has);
