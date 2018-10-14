/**
 * Exports the `map` function, which is similar to Array#map, but works
 * for "collections"; that is: Arrays, Arugments, Objects, Sets, and Maps.
 * @since 10/13/18
 * @file
 */

/* eslint-disable no-array-constructor, prefer-rest-params */

import curry from '@foldr/curry';
import iterate from '@foldr/internal-iterator';

/**
 * A curried mapping function that calls `iteratee` for each item in the given collection.
 * This will work for instances of Array, Arguments, Object, Map and Set.
 * @param {function} iteratee The mapping iteratee function to call for each element.
 * @param {Array|Arguments|Object|Map|Set} collection The collection to map.
 * @returns {Array} The collection mapped over using `iteratee`.
 * @export
 * @example
 * const double = map(x => x * 2);
 * double([1, 2])                         // => [2, 4];
 * double({ x: 1, y: 2 })                 // => [2, 4];
 * double(new Map([['x', 1], ['y', 2]]))  // => [2, 4];
 * double(new Set([1, 2]))                // => [2, 4];
 */
function map(iteratee, collection) {
  let i = 0;

  const results = new Array();
  iterate(function iterateeWrap() {
    results[i++] = iteratee.apply(collection, arguments);
  }, collection);

  return results;
}

export default curry(map);
