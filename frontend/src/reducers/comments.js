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

/**
 * Increment/decrement the comments `voteScore` property
 * based on the `action.option` type
 *
 * @function applyVoteScore
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
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

/**
 * Delete a comment from state
 *
 * @function applyDeleteComment
 * @param {Object} state
 * @param {String} id
 * @return {Object}
 */
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

/**
 * Add or Update comment in state
 *
 * @function applyComment
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyComment = (state, action) => {
  const { comment } = action;

  return Object.assign({}, state, {
    items: {
      [comment.id]: comment,
    },
  });
};

/**
 * Return all comments in the desired data structure
 *
 * commemnts: {
 *   isFetching: false,
 *   items: {...}
 * }
 * @function applyFetchCommentsSuccess
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyFetchCommentsSuccess = (state, action) => {
  const { comments } = action;

  return Object.assign({}, state, {
    isFetching: false,
    items: comments.reduce((commentsObj, comment) => {
      commentsObj[comment.id] = comment;
      return commentsObj;
    }, {}),
  });
};

/**
 * Return current state and set `isFetching: true`
 *
 * @function applyFetchCommentsRequest
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyFetchCommentsRequest = (state, action) => {
  return { ...state, isFetching: true };
};

const defaultCommentState = {
  isFetching: false,
  items: {},
};

const comments = (state = defaultCommentState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_REQUEST:
      return applyFetchCommentsRequest(state, action);

    case FETCH_COMMENTS_SUCCESS: {
      return applyFetchCommentsSuccess(state, action);
    }

    case ADD_NEW_COMMENT: {
      return applyComment(state, action);
    }

    case EDIT_COMMENT: {
      return applyComment(state, action);
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
