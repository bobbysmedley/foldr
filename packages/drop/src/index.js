/**
 * Drops the n number of elements from the beginning of an array
 * @param {Array} array - the array to be dropped,
 * @param {int} dropNum -  amount of elements to drop
 * @returns {Array} newArr - a newly dropped array
 */

function drop(array, dropNum) {
  if (!array || !array.length) return new Array();
  let newArr = new Array(), i = 0;
  while ((i + dropNum) < array.length){
    newArr[i] = array[dropNum + i];
    i++
  }
    return newArr;
}

module.exports = drop;