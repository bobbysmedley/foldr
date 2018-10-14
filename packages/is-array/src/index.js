/**
 * Exports the "isArray" function.
 * @since 10/13/18
 * @file
 */

import curry from '@foldr/curry';
import toStringTag from '@foldr/to-string-tag';

/**
 * Determines is `thing` is an Array.
 * @param {any} thing The thing to assert.
 * @returns {boolean} True if thing is an array, false otherwise.
 */
function isArray(thing) {
  return !!thing && (thing instanceof Array || toStringTag(thing) === '[object Array]');
}

export default curry(isArray);
