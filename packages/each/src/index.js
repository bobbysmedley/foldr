/**
 * Exports the `map` function, which will map over Array and Array-like
 * objects and call iteratee for each item in the array, returning a new
 * array with the return values from `iteratee`.
 * @since 10/13/18
 * @file
 */

import curry from '@foldr/curry-proto';

/**
 * A curried mapping function that calls `iteratee` for each item in the array,
 * returning a new array containing the return values from iteratee.
 * @param {function} iteratee The mapping iteratee function to call for each element.
 * @param {Array|Arguments} collection The array to map.
 * @export
 */
export default curry(Array.prototype.forEach, { guard: Array });
