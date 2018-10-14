/**
 * Exports the "includes" function.
 * @since 10/13/18
 * @file
 */

import some from '@foldr/some';
import curry from '@foldr/curry';
import isArray from '@foldr/isArray';

/**
 * Checks if `value` is in `collection`.
 * @param {any} value The value to find in collection.
 * @param {Array|Arguments|Object|Map|Set} collection The collection find value in.
 * @returns {boolean} True if `value` is in collection, false otherwise.
 * @export
 * @example
 * const includesFoo = includes('foo');
 * includesFoo(['bar', 'baz', 'foo']);  // true
 * includesFoo({ a: 'foo', b: 'bar' }); // true
 * includesFoo({ a: 'baz', b: 'bar' }); // false
 */
function includes(value, collection) {
  if (isArray(collection)) return collection.indexOf(value) > -1;
  return some(item => item === value, collection);
}

export default curry(includes);
