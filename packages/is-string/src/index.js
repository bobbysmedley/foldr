/**
 * Exports the `isString` function.
 * @since 10/14/18
 * @file
 */

import curry from '@foldr/curry';
import toStringTag from '@foldr/to-string-tag';

/**
 * Determines if the given item is a string.
 * @param {any} x The value to assert stringy-ness.
 * @returns {boolean} True if `x` is a string, false otherwise.
 * @export
 */
function isString(x) {
  return typeof x === 'string' || (typeof x === 'object' && toStringTag(x) === '[object String]');
}

export default curry(isString);
