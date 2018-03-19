import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import {
  fetchAllPosts,
  fetchPostsByCategory,
  fetchAllCategories,
  fetchAllComments,
} from '../actions';

import Header from '../components/header/Header';
import CategoriesToShow from './CategoriesToShow';
import Post from './Post';

import '../css/App.css';

class App extends Component {
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

        <Route
          exact
          path="/:category?"
          render={props => (
            <CategoriesToShow category={props.match.params.category} />
          )}
        />
        <Route
          path="/:category/:postId"
          render={props => <Post postId={props.match.params.postId} />}
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

// NOTE: Here in `mapStateToProps` I want to convert the `posts` and `comments` from an array of objects into
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

export default withRouter(connect(mapStateToProps)(App));
