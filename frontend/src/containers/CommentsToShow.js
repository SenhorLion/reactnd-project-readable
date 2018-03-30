import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchAllComments, onAddComment } from '../actions';

import CommentsList from '../components/comments/CommentsList';

class CommentsToShow extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchAllComments } = this.props;

    fetchAllComments();
  }

  render() {
    const {
      postId,
      comments,
      categoryColour,
      fetchAllComments,
      onAddComment,
    } = this.props;

    console.log('props', this.props);

    return (
      <CommentsList
        comments={comments}
        postId={postId}
        categoryColour={categoryColour}
        fetchAllComments={fetchAllComments}
        onAddComment={onAddComment}
      />
    );
  }
}

const getCommentsToShow = (postId, comments) => {
  // debugger;
  if (postId && comments) {
    return Object.values(comments).filter(
      comment => comment.parentId === postId
    );
  }

  return undefined;
};

const mapStateToProps = ({ comments }, ownProps) => {
  const { postId } = ownProps;

  return {
    comments: {
      isFetching: comments.isFetching,
      items: getCommentsToShow(postId, comments.items),
    },
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchAllComments, onAddComment })(CommentsToShow)
);
