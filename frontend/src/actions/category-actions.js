import { REQUEST_ALL_CATEGORIES, RECEIVE_ALL_CATEGORIES } from './actions';
import * as API from '../api';

export const requestAllCategories = () => ({
  type: REQUEST_ALL_CATEGORIES,
  // isFetching: true,
});

export const receiveAllCategories = categories => ({
  type: RECEIVE_ALL_CATEGORIES,
  categories,
  // isFetching: false,
  // receivedAt: Date.now(),
});

export const fetchAllCategories = () => dispatch => {
  // First dispatch: the app state is updated to inform
  // that the API call is starting.
  dispatch(requestAllCategories());
  // The function called by the thunk middleware can return a value,
  // that is passed on as the return value of the dispatch method.
  // In this case, we return a promise to wait for.
  // This is not required by thunk middleware, but it is convenient for us.
  return API.fetchAllCategories().then(categories =>
    // Do not use catch, because that will also catch
    // any errors in the dispatch and resulting render,
    // causing a loop of 'Unexpected batch number' errors.
    // https://github.com/facebook/react/issues/6895
    //
    // Then dispatch: update the app state with the results of the API call.
    dispatch(receiveAllCategories(categories))
  );
};
