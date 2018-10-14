/* eslint-disable
  no-bitwise, no-array-constructor, one-var-declaration-per-line, one-var, prefer-const
*/

/**
 * Shallow clones an array
 * @param {Array} arr - the array to clone
 * @returns {Array} - the newly cloned array
 */
export function cloneArray(arr) {
  let clone = new Array(arr.length), ind = arr.length;
  while (ind--) {
    clone[ind] = arr[ind];
  }
  return clone;
}

/**
 * Implements the Fisher-Yates" shuffle algorithm
 * @param {Array} arr - the array to be shifted
 * @returns {Array} - the newly shifted array
 */
export function implementShuffle(arr) {
  let dupe = cloneArray(arr), top = arr.length, rand = top, curr = top;
  while (--top) {
    rand = (Math.random() * (top + 1)) | 0;
    curr = dupe[rand];
    dupe[rand] = dupe[top];
    dupe[top] = curr;
  }
  return dupe;
}

/**
 * Shuffle function which implements the "Fisher-Yates" shuffle algorithm
 * @param {array} arr - the array to be shuffled
 * @returns {array} - a shuffled array
 */
function shuffle(arr) {
  const size = arr && arr.length;
  if (size > 1) return implementShuffle(arr);
  return (size && size > 1) ? new Array(1).fill(arr[0]) : new Array();
}

export default shuffle;
