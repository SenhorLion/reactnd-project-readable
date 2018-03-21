import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/actionTypes';

const categories = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return state;

    case FETCH_CATEGORIES_SUCCESS:
      return action.categories;

    default:
      return state;
  }
};

export default categories;
