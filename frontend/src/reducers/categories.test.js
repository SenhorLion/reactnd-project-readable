import categories from './categories';

describe('categories reducer', () => {
  it('should handle initial state', () => {
    console.log('categories', categories(undefined, {}));
    expect(categories(undefined, {})).toEqual([]);
  });
});
