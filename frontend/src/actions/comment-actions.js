import {
  REQUEST_POST_COMMENTS,
  RECEIVE_POST_COMMENTS,
  RECEIVE_ALL_COMMENTS,
  REQUEST_ALL_COMMENTS,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_BY_POST_ID,
} from './actions';

import * as API from '../api';

export const requestAllComments = () => ({
  type: REQUEST_ALL_COMMENTS,
  // isFetching: true,
});

export const receiveAllComments = comments => ({
  type: RECEIVE_ALL_COMMENTS,
  comments,
  // isFetching: true,
});

export const requestPostComments = () => ({
  type: REQUEST_POST_COMMENTS,
  // isFetching: true,
});

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
  // isFetching: true,
});

export const fetchAllComments = () => dispatch => {
  // First dispatch: the app state is updated to inform
  // that the API call is starting.
  dispatch(requestAllComments());
  // The function called by the thunk middleware can return a value,
  // that is passed on as the return value of the dispatch method.
  // In this case, we return a promise to wait for.
  // This is not required by thunk middleware, but it is convenient for us.
  return API.fetchAllComments().then(comments =>
    // Do not use catch, because that will also catch
    // any errors in the dispatch and resulting render,
    // causing a loop of 'Unexpected batch number' errors.
    // https://github.com/facebook/react/issues/6895
    //
    // Then dispatch: update the app state with the results of the API call.
    dispatch(receiveAllComments(comments))
  );
};

export const fetchPostComments = () => dispatch => {
  // First dispatch: the app state is updated to inform
  // that the API call is starting.
  dispatch(requestPostComments());
  // The function called by the thunk middleware can return a value,
  // that is passed on as the return value of the dispatch method.
  // In this case, we return a promise to wait for.
  // This is not required by thunk middleware, but it is convenient for us.
  return API.fetchPostComments().then(comments =>
    // Do not use catch, because that will also catch
    // any errors in the dispatch and resulting render,
    // causing a loop of 'Unexpected batch number' errors.
    // https://github.com/facebook/react/issues/6895
    //
    // Then dispatch: update the app state with the results of the API call.
    dispatch(receivePostComments(comments))
  );
};
