/**
 * Exports the "indexOf" function.
 * @since 10/13/18
 * @file
 */

import curry from '@foldr/curry';
import isArrayLike from '@foldr/isArrayLike';

const ArrayIndexOf = Array.prototype.indexOf;

/**
 * Returns the index of `item` in `collection`.
 * @param {any} item The value to find the index of.
 * @param {Array} array The array to find the index of `item` in.
 * @param {number=} fromIndex The starting index to look for `item`.
 * @returns {boolean} The index of `item` in `array`, or -1 if `item` isn't in `array`.
 * @export
 * @example
 * const fooIndex = indexOf('foo');
 * fooIndex(['bar', 'foo', 'baz']); // 1
 */
function indexOf(item, array, fromIndex = 0) {
  return isArrayLike(array) ? ArrayIndexOf.call(array, item, fromIndex) : -1;
}

export default curry(indexOf);
