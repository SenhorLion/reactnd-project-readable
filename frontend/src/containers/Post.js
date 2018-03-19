import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PostDetailView from '../components/posts/PostDetailView';

const getPostToShow = (posts, postId) => {
  console.log('@ Post :: getPostToShow:', posts, postId);

  if (posts && postId) {
    return Object.values(posts).find(post => post.id === postId);
  }

  return undefined;
};

// TODO: dispatch action to fetch post
const mapStateToProps = ({ posts }, ownProps) => {
  const { postId } = ownProps;

  console.log('@ Post :: mapStateToProps:', postId);

  return {
    post: getPostToShow(posts, postId),
  };
};

const Post = withRouter(connect(mapStateToProps)(PostDetailView));

export default Post;
