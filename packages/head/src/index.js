/**
 * Head function, which returns the first index of a proven array
 * @param {array} arr - the array that will provide the first index
 * @returns array[0] - the value at the first index of an array
 */


function head(array) {
  if (array && array.length) {
    return array[0];
  } return undefined;
}

module.exports = head;
