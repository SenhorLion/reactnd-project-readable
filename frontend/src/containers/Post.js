import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onDeletePost, fetchAllPosts } from '../actions';
import PostDetailView from '../components/posts/PostDetailView';

const getPostToShow = (posts, postId) => {
  if (posts && postId) {
    return Object.values(posts).find(post => post.id === postId);
  }

  return {};
};

// TODO: dispatch action to fetch post
const mapStateToProps = ({ posts }, ownProps) => {
  const { postId } = ownProps;

  console.log('@ Post :: mapStateToProps:', postId, posts);

  return {
    post: {
      isFetching: posts.isFetching,
      item: getPostToShow(posts.items, postId),
    },
    // post: getPostToShow(posts, postId),
  };
};

const Post = withRouter(
  connect(mapStateToProps, { fetchAllPosts, onDeletePost })(PostDetailView)
);

export default Post;
