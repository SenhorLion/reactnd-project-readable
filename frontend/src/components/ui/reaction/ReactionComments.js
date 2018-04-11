import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  onUpVoteComment,
  onDownVoteComment,
  fetchAllComments,
} from '../../../actions';

import Reaction from './Reaction';

const getComment = (comments, itemId) => {
  if (comments && itemId) {
    return Object.values(comments).find(comment => comment.id === itemId);
  }
};

const mapStateToProps = ({ comments }, ownProps) => {
  const { itemId } = ownProps;
  const { items } = comments;

  return { item: getComment(items, itemId) };
};

const ReactionComments = withRouter(
  connect(mapStateToProps, {
    onUpVote: onUpVoteComment,
    onDownVote: onDownVoteComment,
    fetchAllComments,
  })(Reaction)
);

export default ReactionComments;
