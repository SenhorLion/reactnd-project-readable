import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onDeleteComment, onDeletePost, fetchAllPosts } from '../actions';
import PostDetailView from '../components/posts/PostDetailView';

const mapStateToProps = ({ posts }, ownProps) => {
  const { postId } = ownProps;

  return {
    post: {
      isFetching: posts.isFetching,
      item: posts.items[postId],
    },
  };
};

const Post = withRouter(
  connect(mapStateToProps, { fetchAllPosts, onDeletePost, onDeleteComment })(
    PostDetailView
  )
);

export default Post;
