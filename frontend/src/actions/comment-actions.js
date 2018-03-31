import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_BY_POST_ID,
} from './actionTypes';

import * as API from '../api';

export const requestAllComments = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const receiveAllComments = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  comments,
});

const addComment = comment => ({
  type: ADD_NEW_COMMENT,
  comment,
});

const deleteComment = id => ({
  type: DELETE_COMMENT,
  id,
});

const editComment = comment => ({
  type: EDIT_COMMENT,
  comment,
});

const fetchAllComments = () => dispatch => {
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

const onAddComment = comment => dispatch => {
  return API.addComment(comment).then(commentData => {
    return dispatch(addComment(commentData));
  });
};

const onEditComment = comment => dispatch => {
  return API.editComment(comment).then(commentData => {
    return dispatch(editComment(commentData));
  });
};

const onDeleteComment = commentId => dispatch => {
  return API.deleteComment(commentId).then(res => {
    return dispatch(deleteComment(commentId));
  });
};

export { fetchAllComments, onAddComment, onEditComment, onDeleteComment };
