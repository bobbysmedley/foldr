/**
 * Drops the n number of elements from the beginning of an array
 * @param {Array} array - the array to be dropped, {int} dropNum -  amount of elements to drop
 * @returns {Array} a newly dropped array
 */

function drop(array, dropNum) {
  if (!array || !array.length || typeof array === 'string') return undefined;
  const copy = [];
  let count = 0;
  let i = array.length;
  while(i--) copy[i] = array[i];
    while (count < dropNum && count < copy.length){
      array.shift();
      count++;
    }
    return array;
}

module.exports = drop;
console.log(drop([1, { foo: 'bar' }, 'hello'], 5000));

var iterations = 1000000;
console.time('Function #1');
for(var i = 0; i < iterations; i++ ){
  drop([1, { foo: 'bar' }, 'hello'], 5000);
};
console.timeEnd('Function #1')