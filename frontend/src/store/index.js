import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

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
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    rootReducer,
    /*initialState,*/
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configureStore;
