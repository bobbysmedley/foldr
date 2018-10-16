const _ = require('lodash');
const R = require('rambda');
const Benchmark = require('benchmark');
const drop = require('./dist');
const { log } = console;
const toFixed = n => n.toLocaleString('en-US', { maximumFractionDigits: 0 });
function handleCycleComplete({ target }) {
  const { name, hz, error } = target;
  log(`${name}: ${error ? `[Error: ${error.message}]` : toFixed(hz)}`);
}
new Benchmark.Suite()
  .add('Foldr #1', () => drop([1, { foo: 'bar' }, 'hello'], 2))
  .add('Lodash #1', () => _.drop([1, { foo: 'bar' }, 'hello'], 2))
  .add('Rambda #1', () => R.drop([1, { foo: 'bar' }, 'hello'], 2))
  .on('cycle', handleCycleComplete)
  .run({ async: true });