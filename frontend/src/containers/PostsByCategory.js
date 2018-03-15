import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../components/category/Category';

const mapStateToProps = ({ posts, categories }, ownProps) => {
  const { category } = ownProps;
  console.log('category', category);

  return {
    posts: Object.values(posts).filter(post => post.category === category),
    categories,
    category,
  };
};

const PostsByCategory = connect(mapStateToProps)(Category);

export default PostsByCategory;
