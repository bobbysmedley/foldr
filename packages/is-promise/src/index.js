/**
 * Exports the `isPromise` function.
 * @since 9/25/18
 * @file
 */

import curry from '@foldr/curry';
import toStringTag from '@foldr/to-string-tag';

/**
 * Determines if an object has both a `.then` and `.catch` method.
 * @param {Object} x The object to determine "thenable-ness" of.
 * @returns {boolean} True if `x` is thenable, false otherwise.
 */
const isThenable = x => typeof x.then === 'function' && typeof x.catch === 'function';

/**
 * Determines if the given item is a Promise object.
 * That is, if it is a native Promise, or it's `thenable` (contains .then and .catch functions).
 * @param {any} x The value to determine whether or not it's a Promise.
 * @returns {boolean} True if `x` is a Promise, false otherwise.
 * @export
 */
function isPromise(x) {
  return !!x && typeof x === 'object' && (toStringTag(x) === '[object Promise]' || isThenable(x));
}

export default curry(isPromise);
