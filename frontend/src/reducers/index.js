import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import categories from './categories';
import posts from './posts';
import comments from './comments';

export default combineReducers({
  categories,
  posts,
  comments,
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer,
});
