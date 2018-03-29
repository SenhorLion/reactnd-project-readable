import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  ADD_NEW_POST,
  DELETE_POST,
  SAVE_EDIT_POST,
  GET_POST_BY_ID,
} from '../actions/actionTypes';

const defaultPostState = {
  isFetching: false,
  items: {},
};
const posts = (state = defaultPostState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return { ...state, isFetching: true };
    }

    case FETCH_POSTS_SUCCESS: {
      const { posts } = action;

      // NOTE: We want to enforce posts state is in the desired structure:
      // posts: {
      //   isFetching: false,
      //   items: {...}
      // }
      return Object.assign({}, state, {
        isFetching: false,
        items: posts.reduce((postsObj, post) => {
          postsObj[post.id] = post;
          return postsObj;
        }, {}),
      });
    }

    case ADD_NEW_POST: {
      const { post } = action;

      return Object.assign({}, state, {
        items: {
          [post.id]: post,
        },
      });
    }

    case DELETE_POST: {
      const { id } = action;
      const newState = { ...state };

      // TODO: Check this is all neccesary,
      // can we get away with just filtering?
      const filteredPosts = Object.keys(newState.items)
        .filter(postId => postId !== id)
        .reduce((posts, id) => {
          posts[id] = newState.items[id];
          return posts;
        }, {});

      return Object.assign({}, state, {
        items: filteredPosts,
      });
    }

    case SAVE_EDIT_POST: {
      const { post } = action;

      return Object.assign({}, state, {
        items: {
          [post.id]: post,
        },
      });
    }

    // TODO: Do we need / use this outside of the tests?
    case GET_POST_BY_ID: {
      const { id } = action;

      return state.items[id];
    }

    default:
      return state;
  }
};

export default posts;
