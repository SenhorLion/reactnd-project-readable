// actions/todo_actions.js

// import * as TodoAPIUtil from '../util/todo_api_util';

// export const RECEIVE_TODOS = "RECEIVE_TODOS";

// export const receiveTodos = todos => ({
//   type: RECEIVE_TODOS,
//   todos
// });

// export const fetchTodos = () => dispatch => (
//   TodoAPIUtil
//       .fetchTodos()
//       .then(todos => dispatch(receiveTodos(todos)))
// );

import { REQUEST_ALL_POSTS, RECEIVE_ALL_POSTS, ADD_NEW_POST } from './actions';

import * as API from '../api';

export const requestAllPosts = () => ({
  type: REQUEST_ALL_POSTS,
  // isFetching: true,
});

export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts,
  // isFetching: true,
});

export const addPost = ({ id, post }) => ({
  type: ADD_NEW_POST,
  id,
  post,
});

export const fetchAllPosts = () => dispatch => {
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
