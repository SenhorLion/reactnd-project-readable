import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_BY_POST_ID,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
} from '../actions/actionTypes';

import { UP_VOTE, DOWN_VOTE } from '../constants';
import { incrementValue, decrementValue } from '../utils/helper';

const updateVoteScore = (state, action) => {
  const { commentId, option } = action;
  const currentComment = state.items[commentId];

  return Object.assign({}, state, {
    items: {
      ...state.items,
      [commentId]: {
        ...currentComment,
        voteScore:
          option === UP_VOTE
            ? incrementValue(currentComment.voteScore)
            : decrementValue(currentComment.voteScore),
      },
    },
  });
};

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

      return Object.assign({}, state, {
        items: {
          [comment.id]: comment,
        },
      });
    }

    case COMMENT_UP_VOTE: {
      return updateVoteScore(state, action);
    }

    case COMMENT_DOWN_VOTE: {
      return updateVoteScore(state, action);
    }

    default:
      return state;
  }
};

export default comments;
