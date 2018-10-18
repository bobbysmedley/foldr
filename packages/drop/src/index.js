/**
 * Drops the n number of elements from the beginning of an array
 * @param {Array} array - the array to be dropped,
 * @param {int} dropNum -  amount of elements to drop
 * @returns {Array} newArr - a newly dropped array
 */

function drop(array, dropNum) {
  if (!array || !array.length) return new Array();

  function isInteger(int) {
    return (typeof int === 'number') && (int % 1 === 0);
  }
  if (isInteger(dropNum)){
    let newArr = new Array(), i = 0;
    while ((i + dropNum) < array.length){
      newArr[i] = array[dropNum + i];
      i++
    }
    return newArr;
  }
  else return array;
}

module.exports = drop;
