import {
  REQUEST_ALL_COMMENTS,
  RECEIVE_ALL_COMMENTS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_BY_POST_ID,
} from '../actions/actionTypes';

const comments = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ALL_COMMENTS:
      return state;

    case RECEIVE_ALL_COMMENTS: {
      const { comments } = action;

      return comments;
    }

    default:
      return state;
  }
};

export default comments;
