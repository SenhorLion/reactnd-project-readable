import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../components/category/Category';

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts,
    categories,
  };
};

const Posts = connect(mapStateToProps)(Category);

export default Posts;
