import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  GET_POST_BY_ID,
  ADD_NEW_POST,
  DELETE_POST,
  SAVE_EDIT_POST,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
} from '../actions/actionTypes';

import { UP_VOTE } from '../constants';
import { incrementValue, decrementValue } from '../utils/helper';

/**
 * Increment/decrement the posts `voteScore` property
 * based on the `action.option` type
 *
 * @function applyUpdateVoteScore
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyUpdateVoteScore = (state, action) => {
  const { postId, option } = action;
  const currentPost = state.items[postId];

  return Object.assign({}, state, {
    items: {
      ...state.items,
      [postId]: {
        ...currentPost,
        voteScore:
          option === UP_VOTE
            ? incrementValue(currentPost.voteScore)
            : decrementValue(currentPost.voteScore),
      },
    },
  });
};

/**
 * Return current state and set `isFetching: true`
 *
 * @function applyFetchPostsRequest
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyFetchPostsRequest = (state, action) => {
  return { ...state, isFetching: true };
};

/**
 * Return all posts in the desired data structure
 *
 * posts: {
 *   isFetching: false,
 *   items: {...}
 * }
 * @function applyFetchPosts
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyFetchPosts = (state, action) => {
  const { posts } = action;

  return Object.assign({}, state, {
    isFetching: false,
    items: posts.reduce((postsObj, post) => {
      postsObj[post.id] = post;
      return postsObj;
    }, {}),
  });
};

/**
 * Delete a post from state
 *
 * @function applyDeletePost
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyDeletePost = (state, action) => {
  const filteredPosts = Object.keys(state.items)
    .filter(postId => postId !== action.id)
    .reduce((posts, id) => {
      posts[id] = state.items[id];
      return posts;
    }, {});

  return Object.assign({}, state, {
    items: filteredPosts,
  });
};

/**
 * Add or Update post in state
 *
 * @function applyPost
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyPost = (state, action) => {
  const { post } = action;

  return Object.assign({}, state, {
    items: {
      [post.id]: post,
    },
  });
};

/**
 * Return post by id
 *
 * @function applyGetPostById
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyGetPostById = (state, action) => {
  const { id } = action;

  return state.items[id];
};

const defaultPostState = {
  isFetching: false,
  items: {},
};

const posts = (state = defaultPostState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return applyFetchPostsRequest(state, action);
    }

    case FETCH_POSTS_SUCCESS: {
      return applyFetchPosts(state, action);
    }

    case ADD_NEW_POST: {
      return applyPost(state, action);
    }

    case DELETE_POST: {
      return applyDeletePost(state, action);
    }

    case SAVE_EDIT_POST: {
      return applyPost(state, action);
    }

    case GET_POST_BY_ID: {
      return applyGetPostById(state, action);
    }

    case POST_UP_VOTE: {
      return applyUpdateVoteScore(state, action);
    }

    case POST_DOWN_VOTE: {
      return applyUpdateVoteScore(state, action);
    }

    default:
      return state;
  }
};

export default posts;
