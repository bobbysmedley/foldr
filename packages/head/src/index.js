/**
 * Head function which returns the first index of an array with validaiton
 * @param {array} arr - the array to be shuffled
 * @returns {array} - shuffled array
 */


function head(arr) {
  if (Array.isArray(arr)){
    return arr[0];
  }
  return undefined;
  // return (arr && arr.length) ? arr[0] : undefined;
}

module.export = head;

// const now = Date.now();
//
// for (let i = 0; i < 10000; i++) {
//   head(Array(i));
// }
//
// console.log(`Finished computation in ${Date.now() - now}ms`);