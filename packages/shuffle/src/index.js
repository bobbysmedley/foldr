/**
 * Shuffle function which implements the "Fisher-Yates" shuffle algorithm
 * @param {array} arr - the array to be shuffled
 * @returns {array} - shuffled array
 */
module.exports = function shuffle(arr) {
  if (!Array.isArray(arr) || !arr.length) return [];
  let dupe = arr, top = arr.length, rand = top, curr = top;
  while (--top) {
    rand = (Math.random() * (top + 1)) | 0;
    curr = dupe[rand];
    dupe[rand] = dupe[top];
    dupe[top] = curr;
  }
  return dupe;
}
