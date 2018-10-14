/**
 * Exports the `filter` function, which is similar to Array#filter, but works
 * for "collections"; that is: Arrays, Arugments, Objects, Sets, and Maps.
 * @since 10/13/18
 * @file
 */

/* eslint-disable no-array-constructor, prefer-rest-params */

import curry from '@foldr/curry';
import iterate from '@foldr/internal-iterator';

/**
 * A curried filtering function that is similar to Array#filter, except that
 * it will work for instances of Array, Arguments, Object, Map and Set.
 * @param {function} filterFunction The function to call to determine if the current
 * element in the collection should be included in the returned array.
 * @param {Array|Arguments|Object|Map|Set} collection The collection to map.
 * @returns {Array} The collection filtered according to `filterFunction`.
 * @export
 * @example
 * const numbersOf = filter(x => typeof x === 'number');
 * const numbers = numbersOf(['a', 1, 2, 3, 'b']);  // [1, 2, 3];
 */
function filter(filterFunction, collection) {
  let i = 0;

  const filtered = new Array();
  iterate(function iterateeWrap(value) {
    if (filterFunction.apply(collection, arguments)) filtered[i++] = value;
  }, collection);

  return filtered;
}

export default curry(filter);
