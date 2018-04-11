import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { onUpVotePost, onDownVotePost, fetchAllPosts } from '../../../actions';

import Reaction from './Reaction';

const getPost = (posts, itemId) => {
  if (posts && itemId) {
    return Object.values(posts).find(post => post.id === itemId);
  }
};

const mapStateToProps = ({ posts }, ownProps) => {
  const { itemId } = ownProps;
  const { items } = posts;

  return { item: getPost(items, itemId) };
};

const ReactionPosts = withRouter(
  connect(mapStateToProps, {
    onUpVote: onUpVotePost,
    onDownVote: onDownVotePost,
    fetchAllPosts,
  })(Reaction)
);

export default ReactionPosts;
