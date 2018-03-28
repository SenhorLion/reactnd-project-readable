import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onSaveEditPost, fetchAllPosts } from '../actions';

import PostEditView from '../components/posts/PostEditView';

const getPostToEdit = (posts, postId) => {
  console.log('@ Post :: getPostToEdit:', posts, postId);

  if (posts && postId) {
    return Object.values(posts).find(post => post.id === postId);
  }

  return undefined;
};

// TODO: dispatch action to fetch post
const mapStateToProps = ({ posts }, ownProps) => {
  const { postId } = ownProps;
  const { isFetching, items } = posts;

  return {
    post: {
      isFetching,
      item: getPostToEdit(items, postId),
    },
    // post: getPostToEdit(posts, postId),
  };
};

const PostEdit = withRouter(
  connect(mapStateToProps, {
    onSaveEditPost,
    fetchAllPosts,
  })(PostEditView)
);

export default PostEdit;
