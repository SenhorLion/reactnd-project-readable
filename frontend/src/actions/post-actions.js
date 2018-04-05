import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  ADD_NEW_POST,
  DELETE_POST,
  SAVE_EDIT_POST,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
} from './actionTypes';

import * as API from '../api';

const requestAllPosts = () => ({
  type: FETCH_POSTS_REQUEST,
});

const receiveAllPosts = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts,
});

const addPost = post => ({
  type: ADD_NEW_POST,
  post,
});

const deletePost = id => ({
  type: DELETE_POST,
  id,
});

const saveEditPost = post => ({
  type: SAVE_EDIT_POST,
  post,
});

const upVotePost = (postId, option) => ({
  type: POST_UP_VOTE,
  postId,
  option,
});

const downVotePost = (postId, option) => ({
  type: POST_DOWN_VOTE,
  postId,
  option,
});

const fetchAllPosts = () => dispatch => {
  // First dispatch: the app state is updated to inform
  // that the API call is starting.
  dispatch(requestAllPosts());
  // The function called by the thunk middleware can return a value,
  // that is passed on as the return value of the dispatch method.
  // In this case, we return a promise to wait for.
  // This is not required by thunk middleware, but it is convenient for us.
  return API.fetchAllPosts().then(posts =>
    // Do not use catch, because that will also catch
    // any errors in the dispatch and resulting render,
    // causing a loop of 'Unexpected batch number' errors.
    // https://github.com/facebook/react/issues/6895
    //
    // Then dispatch: update the app state with the results of the API call.
    dispatch(receiveAllPosts(posts))
  );
};

const onSaveEditPost = post => dispatch => {
  return API.saveEditPost(post).then(postData => {
    return dispatch(saveEditPost(postData));
  });
};

const onAddPost = post => dispatch => {
  return API.addPost(post).then(postData => {
    return dispatch(addPost(postData));
  });
};

const onUpVotePost = (postId, option) => dispatch => {
  return API.upVotePost(postId, option).then(postData => {
    return dispatch(upVotePost(postId, option));
  });
};

const onDownVotePost = (postId, option) => dispatch => {
  return API.downVotePost(postId, option).then(postData => {
    return dispatch(downVotePost(postId, option));
  });
};

const onDeletePost = postId => dispatch => {
  return API.deletePost(postId).then(res => {
    return dispatch(deletePost(postId));
  });
};

export {
  fetchAllPosts,
  onSaveEditPost,
  onAddPost,
  onUpVotePost,
  onDownVotePost,
  onDeletePost,
};
