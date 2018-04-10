import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/actionTypes';

import categories from './categories';

describe('categories reducer', () => {
  it('should handle initial state', () => {
    expect(categories(undefined, {})).toEqual([]);
  });

  it('should return existing state if no action found', () => {
    const defaultState = [
      {
        name: 'react',
        path: 'react',
      },
      {
        name: 'redux',
        path: 'redux',
      },
      {
        name: 'udacity',
        path: 'udacity',
      },
    ];
    expect(categories(defaultState, {})).toEqual(defaultState);
  });

  it('should return correct data for given action FETCH_CATEGORIES_SUCCESS type', () => {
    const payload = [
      {
        name: 'react',
        path: 'react',
      },
      {
        name: 'redux',
        path: 'redux',
      },
      {
        name: 'udacity',
        path: 'udacity',
      },
    ];

    const receiveAllCategoriesAction = {
      type: FETCH_CATEGORIES_SUCCESS,
      categories: payload,
    };

    const expected = [...payload];

    expect(categories(undefined, receiveAllCategoriesAction)).toEqual(expected);
  });
});
