import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
} from '../actions/actionTypes';

import { UP_VOTE } from '../constants';
import { incrementValue, decrementValue } from '../utils/helper';

const applyVoteScore = (state, action) => {
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

const applyDeleteComment = (state, id) => {
  const filteredComments = Object.keys(state.items)
    .filter(commentId => commentId !== id)
    .reduce((comments, id) => {
      comments[id] = state.items[id];
      return comments;
    }, {});

  return Object.assign({}, state, {
    items: filteredComments,
  });
};

const applyEditComment = (state, action) => {
  const { comment } = action;

  return Object.assign({}, state, {
    items: {
      [comment.id]: comment,
    },
  });
};

const defaultCommentState = {
  isFetching: false,
  items: {},
};

const comments = (state = defaultCommentState, action) => {
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

    case EDIT_COMMENT: {
      return applyEditComment(state, action);
    }

    case DELETE_COMMENT: {
      return applyDeleteComment(state, action.id);
    }

    case COMMENT_UP_VOTE: {
      return applyVoteScore(state, action);
    }

    case COMMENT_DOWN_VOTE: {
      return applyVoteScore(state, action);
    }

    default:
      return state;
  }
};

export default comments;
