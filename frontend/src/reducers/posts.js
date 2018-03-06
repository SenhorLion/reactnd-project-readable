import {
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  ADD_NEW_POST,
  EDIT_POST,
  GET_POST_BY_ID,
} from '../constants';

const posts = (state = {}, action) => {
  const { id, payload } = action;

  switch (action.type) {
    case REQUEST_ALL_POSTS:
      return state;

    case RECEIVE_ALL_POSTS:
      return payload;

    case ADD_NEW_POST:
      return {
        ...state,
        [id]: action.payload,
      };

    default:
      return state;
  }
};

export default posts;
