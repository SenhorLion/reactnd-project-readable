import {
  REQUEST_ALL_CATEGORIES,
  RECEIVE_ALL_CATEGORIES,
} from '../actions/actions';

const categories = (state = [], action) => {
  const { categories } = action;

  switch (action.type) {
    case REQUEST_ALL_CATEGORIES:
      return state;

    case RECEIVE_ALL_CATEGORIES:
      return categories;

    default:
      return state;
  }
};

export default categories;
