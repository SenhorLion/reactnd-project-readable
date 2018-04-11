import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchAllComments,
  fetchAllPosts,
  onAddComment,
  onEditComment,
  onDeleteComment,
} from '../actions';

import CommentList from '../components/comments/CommentList';

class CommentsByPost extends Component {
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
      fetchAllPosts,
      onAddComment,
      onEditComment,
      onDeleteComment,
      openDeleteCommentModal,
    } = this.props;

    return (
      <CommentList
        comments={comments}
        postId={postId}
        categoryColour={categoryColour}
        fetchAllPosts={fetchAllPosts}
        fetchAllComments={fetchAllComments}
        onAddComment={onAddComment}
        onEditComment={onEditComment}
        onDeleteComment={onDeleteComment}
        openDeleteCommentModal={openDeleteCommentModal}
      />
    );
  }
}

const getCommentsToShow = (postId, comments) => {
  if (postId && comments) {
    return Object.values(comments).filter(
      comment => comment.parentId === postId
    );
  }
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
  connect(mapStateToProps, {
    fetchAllComments,
    fetchAllPosts,
    onAddComment,
    onEditComment,
    onDeleteComment,
  })(CommentsByPost)
);
