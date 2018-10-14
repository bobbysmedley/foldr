/**
 * Exports the `isObject` function.
 * @since 9/25/18
 * @file
 */

/**
 * Determines if the given item is an object (and not null).
 * This differs from lodash in that this will not return true for a function!
 * @param {any} x The value to assert object-ness.
 * @returns {boolean} True if `x` is an object, false otherwise.
 * @export
 */
export default function isObject(x) {
  return !!x && typeof x === 'object';
}
