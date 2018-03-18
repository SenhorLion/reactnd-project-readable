import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostDetailView from '../components/posts/PostDetailView';

const getPostToShow = (posts, postId) => {
  console.log('@ getPostToShow:', posts, postId);

  if (postId) {
    return Object.values(posts)
      .filter(post => post.id === postId)
      .reduce((acc, post) => {
        return post;
      }, {});
  }

  return posts;
};

// TODO: dispatch action to fetch post
const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const { posts } = state;
  console.log(
    'mapStateToProps: state',
    state,
    'postId',
    postId,
    'ownProps',
    ownProps
  );

  return {
    post: getPostToShow(posts, postId),
  };
};

const Post = connect(mapStateToProps)(PostDetailView);

export default Post;
