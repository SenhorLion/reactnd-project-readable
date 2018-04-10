import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onSaveEditPost, fetchAllPosts } from '../actions';

import PostEditView from '../components/posts/PostEditView';

const mapStateToProps = ({ posts, categories }, ownProps) => {
  const { postId } = ownProps;
  const { isFetching, items } = posts;

  return {
    post: {
      isFetching,
      item: items[postId],
    },
    categories,
  };
};

const PostEdit = withRouter(
  connect(mapStateToProps, {
    onSaveEditPost,
    fetchAllPosts,
  })(PostEditView)
);

export default PostEdit;
