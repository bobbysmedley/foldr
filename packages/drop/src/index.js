/**
 * Drops the n number of elements from the beginning of an array
 * @param {Array} array - the array to be dropped, {int} dropNum -  amount of elements to drop
 * @returns {Array} a newly dropped array
 */

function drop(array, dropNum) {
  if (!array || !array.length) return undefined;
  // const copy = new Array(array.length - dropNum);
  // let count = 0;
  let newArr = [];

    // while (count < dropNum && count < copy.length){
    //   newArr[count] = array[c]
    //   count++;
    // }
  let i = 0;
  while ((i + dropNum) < array.length){
    newArr[i] = array[dropNum + i];
    i++
  }

    return newArr;
}

module.exports = drop;
console.log(drop([1, { foo: 'bar' }, 'hello'], 1));

var iterations = 1000000;
console.time('Function #1');
for(var i = 0; i < iterations; i++ ){
  drop([1, { foo: 'bar' }, 'hello'], 5000);
};
console.timeEnd('Function #1')