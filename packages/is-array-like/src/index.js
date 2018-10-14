/**
 * Exports the "isArrayLike" function.
 * @since 10/13/18
 * @file
 */

import curry from '@foldr/curry';

/**
 * Determines if the given `thing` is "array like", meaning
 * it is non-falsy and has a length property.
 * @param {any} thing The thing to assert.
 * @returns {boolean} True if `thing` is array-like, false otherwise.
 * @export
 */
function isArrayLike(thing) {
  return !!thing && (thing.length || thing.length === 0);
}

export default curry(isArrayLike);
