import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_BY_POST_ID,
} from '../actions/actionTypes';

const comments = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return { ...state, isFetching: true };

    case FETCH_COMMENTS_SUCCESS: {
      const { comments } = action;

      return Object.assign({}, state, {
        isFetching: false,
        items: comments.reduce((commentsObj, comment) => {
          commentsObj[comment.id] = comment;
          return commentsObj;
        }, {}),
      });
    }

    case ADD_NEW_COMMENT: {
      const { comment } = action;

      console.log('ADD_NEW_COMMENT', action);

      return Object.assign({}, state, {
        items: {
          [comment.id]: comment,
        },
      });
    }

    default:
      return state;
  }
};

export default comments;
