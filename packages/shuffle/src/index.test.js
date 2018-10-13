const shuffle = require('./');

describe('shuffle', () => {
  it('should shuffle an array', () => {
    const ogArray = [1, 2, 3, 4, 5];

    const shuffled = shuffle(ogArray);

    expect(shuffled.length).toBe(ogArray.length);
    expect(JSON.stringify(ogArray) !== JSON.stringify(shuffled)).toBe(true);
  });

  it('should return an empty array if param is not an array', () => {
    expect(shuffle(null)).toEqual([]);
    expect(shuffle()).toEqual([]);
    expect(shuffle('hello')).toEqual([]);
    expect(shuffle({})).toEqual([]);
  });
});
