/**
 * Exports the `isNumber` function.
 * @since 9/25/18
 * @file
 */

import curry from '@foldr/curry';
import toStringTag from '@foldr/to-string-tag';

/**
 * Determines if the given item is a number.
 * @param {any} x The value to assert number-ness.
 * @returns {boolean} True if `x` is a number, false otherwise.
 * @export
 */
function isNumber(x) {
  return typeof x === 'number' || (typeof x === 'object' && toStringTag(x) === '[object Number]');
}

export default curry(isNumber);
