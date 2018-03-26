import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  ADD_NEW_POST,
  DELETE_POST,
  SAVE_EDIT_POST,
  GET_POST_BY_ID,
} from '../actions/actionTypes';

const posts = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return state;

    case FETCH_POSTS_SUCCESS: {
      const { posts } = action;

      return Object.values(posts).reduce((postsObj, post) => {
        postsObj[post.id] = post;
        return postsObj;
      }, {});
    }

    case ADD_NEW_POST: {
      const { post } = action;

      console.log('ADD_NEW_POST', action.type, 'post', post, 'action', action);

      return {
        ...state,
        [post.id]: post,
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

    case SAVE_EDIT_POST: {
      const { post } = action;
      console.log('action.type', action.type, 'post', post, 'action', action);

      return {
        ...state,
        [post.id]: post,
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
