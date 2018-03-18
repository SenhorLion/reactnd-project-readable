import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../components/category/Category';

const getPostsToShow = (posts, category) => {
  console.log('@ getPostsToShow::category', category);
  if (category) {
    return Object.values(posts).filter(post => post.category === category);
  }

  return posts;
};

const mapStateToProps = ({ posts, categories }, ownProps) => {
  const { category } = ownProps;
  console.log('category', category);

  return {
    posts: getPostsToShow(posts, category),
    categories,
    category,
  };
};

const CategoriesToShow = connect(mapStateToProps)(Category);

export default CategoriesToShow;
