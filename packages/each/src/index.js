/**
 * Exports the `each` function, which is similar to Array#forEach, but works
 * for "collections"; that is: Arrays, Arugments, Objects, Sets, and Maps.
 * @since 10/13/18
 * @file
 */

/* eslint-disable prefer-rest-params */

import curry from '@foldr/curry';
import isArray from '@foldr/is-array';
import iterate from '@foldr/internal-iterator';

const ArrayEach = Array.prototype.forEach;

/**
 * A curried "for each" function that calls `iteratee` for each item in the given collection.
 * This will work for instances of Array, Arguments, Object, Map and Set.
 * @param {function} iteratee The iteratee function to call for each element of `collection`.
 * @param {Array|Arguments|Object|Map|Set} collection The collection to iterate over.
 * @returns {undefined}
 * @export
 * @example
 * const logEach = each(console.log);
 * logEach([1, 2])                         // => undefined (Prints 2, then 4)
 * logEach({ x: 1, y: 2 })                 // => undefined (Prints 2, then 4)
 * logEach(new Map([['x', 1], ['y', 2]]))  // => undefined (Prints 2, then 4)
 * logEach(new Set([1, 2]))                // => undefined (Prints 2, then 4)
 */
function each(iteratee, collection) {
  if (isArray(collection)) {
    ArrayEach.call(collection, iteratee);
    return;
  }

  iterate(collection, false, function iterateeWrap() {
    iteratee.apply(collection, arguments);
  });
}

export default curry(each);
