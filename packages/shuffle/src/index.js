/**
 * Shuffle function which implements the "Fisher-Yates" shuffle algorithm
 * @param {array} arr - the array to be shuffled
 * @returns {array} - shuffled array
 */
function shuffle(arr) {
  if (arr === null || !arr.length) return [];

  let top = arr.length;
    rand = top,
    curr = top;

  while (--top) {
    rand = Math.floor(Math.random() * (top + 1));
    curr = arr[rand];
    arr[rand] = arr[top];
    arr[top] = curr;
  }

  return arr;
}

module.exports = shuffle;

// feel free to run this for speed test
const now = Date.now();
const amt = 10000;
for (let i = 0; i < amt; i++) {
  shuffle(Array(i));
}

console.log(`Finished shuffling ${amt} times. Process took: ${Date.now() - now}ms`);