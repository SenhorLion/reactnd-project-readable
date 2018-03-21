import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_NEW_POST,
  SAVE_EDIT_POST,
} from './actionTypes';

import * as API from '../api';

const requestAllPosts = () => ({
  type: FETCH_POSTS_REQUEST,
});

const receiveAllPosts = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts,
});

const addPost = (id, post) => ({
  type: ADD_NEW_POST,
  id,
  post,
});

const onSaveEditPost = (id, post) => ({
  type: SAVE_EDIT_POST,
  id,
  post,
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

export { fetchAllPosts, onSaveEditPost };
