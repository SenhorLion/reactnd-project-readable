import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import cuid from 'cuid';

import { capitalize } from '../utils/helper';
import { fetchAllCategories } from '../actions/category-action-creators';
import { fetchAllPosts } from '../actions/post-action-creators';
import {
  fetchAllComments,
  fetchPostComments,
} from '../actions/comment-action-creators';

import Header from '../components/header/Header';
import Posts from './Posts';
import PostsByCategory from './PostsByCategory';
import PostDetailView from '../components/posts/PostDetailView';

import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAllCategories());
    dispatch(fetchAllPosts());
    // NOTE: - Do we need to fetch all comments?
    // maybe they can just be linked to a post
    dispatch(fetchAllComments());
  }

  render() {
    const { categories, posts, comments } = this.props;

    return (
      <div className="app">
        <Header categories={categories} />

        <Route exact path="/" render={() => <Posts />} />
        <Route
          exact
          path="/:category"
          render={props => (
            <PostsByCategory category={props.match.params.category} />
          )}
        />
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   myAction() {
//     dispatch(API.getAllCategories())
//   }
// });

// Here in `mapStateToProps` I want to convert the `posts` and `comments` from an array of objects into
// a keyed object of objects to allow for a more flexible approach
// that allows both easy iteration with `Object.values(state.posts)`, and fast O(1) access to individual items
// e.g:
// from this:
//  `posts: [{id: 1234, title: 'blah'}]`
// to this:
//  posts: {
//    [1234]: { id: 1234, title: 'blah'}
//  }

const mapStateToProps = ({ categories, posts, comments }) => ({
  categories,
  posts: Object.values(posts).reduce((postsObj, post) => {
    postsObj[post.id] = post;
    return postsObj;
  }, {}),
  comments: Object.values(comments).reduce((commentsObj, comment) => {
    commentsObj[comment.id] = comment;
    return commentsObj;
  }, {}),
});

// connect([ mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(Component);

export default withRouter(connect(mapStateToProps)(App));
