import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  categories: [
    { name: 'react', path: 'react' },
    { name: 'redux', path: 'redux' },
    { name: 'udacity', path: 'udacity' },
  ],
};

const configureStore = () => {
  return createStore(
    rootReducer,
    /*initialState,*/
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
