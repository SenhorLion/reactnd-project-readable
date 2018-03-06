import {
  REQUEST_ALL_POSTS,
  RECEIVE_ALL_POSTS,
  ADD_NEW_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POST_BY_ID,
} from '../actions/actions';

const posts = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ALL_POSTS:
      return state;

    case RECEIVE_ALL_POSTS: {
      const { posts } = action;

      return posts;
    }

    case ADD_NEW_POST: {
      const { id, posts } = action;

      return {
        ...state,
        [id]: posts,
      };
    }

    case DELETE_POST: {
      const { id } = action;
      const statePosts = { ...state };
      const filteredPosts = Object.keys(statePosts)
        .filter(postId => postId !== id)
        .reduce((posts, id) => {
          posts[id] = statePosts[id];
          return posts;
        }, {});

      return filteredPosts;
    }

    case EDIT_POST: {
      const { id, post } = action;

      return {
        ...state,
        [id]: post,
      };
    }

    case GET_POST_BY_ID: {
      const { id } = action;

      return state[id];
    }

    default:
      return state;
  }
};

export default posts;
