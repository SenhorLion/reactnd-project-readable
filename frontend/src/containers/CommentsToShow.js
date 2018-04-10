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
      fetchAllPosts,
      onAddComment,
      onEditComment,
      onDeleteComment,
    } = this.props;

    return (
      <CommentsList
        comments={comments}
        postId={postId}
        categoryColour={categoryColour}
        fetchAllPosts={fetchAllPosts}
        fetchAllComments={fetchAllComments}
        onAddComment={onAddComment}
        onEditComment={onEditComment}
        onDeleteComment={onDeleteComment}
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
  })(CommentsToShow)
);
