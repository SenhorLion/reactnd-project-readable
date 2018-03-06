import categories from './categories';

describe('categories reducer', () => {
  it('should handle initial state', () => {
    expect(categories(undefined, {})).toEqual([]);
  });
});
