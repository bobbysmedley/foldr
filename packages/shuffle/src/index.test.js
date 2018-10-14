const shuffle = require('./').default;
const { implementShuffle, cloneArray } = require('./');

describe('shuffle', () => {
  it('should shuffle an array', () => {
    const ogArray = [1, 2, 3, 4, 5];

    const shuffled = shuffle(ogArray);

    expect(shuffled.length).toBe(ogArray.length);
    expect(JSON.stringify(ogArray) !== JSON.stringify(shuffled)).toBe(true);
  });

  it('should return an empty array if param is not an array', () => {
    const str = 'hello';

    expect(shuffle(null)).toEqual([]);
    expect(shuffle()).toEqual([]);
    expect(shuffle(str) !== str).toBe(true);
    expect(shuffle({})).toEqual([]);
  });

  it('cloneArray should shallow clone and return a new array', () => {
    const og = [1, 2, 3];
    const cloned = cloneArray(og);

    expect(cloned.length).toBe(og.length);
    // toEqual since `toBe` will fail due to shallow copy
    expect(cloned).toEqual([1, 2, 3]);
  });

  it('implementShuffle should shuffle an array', () => {
    const og = [1, 2, 3];
    const shuffled = implementShuffle(og);

    expect(JSON.stringify(og) !== JSON.stringify(shuffled)).toBe(true);
  });
});
