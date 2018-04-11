import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import * as actions from '../actions';

import Header from '../components/header/Header';
import PostsByCategory from './PostsByCategory';
import PostEdit from './PostEdit';
import PostDetail from './PostDetail';

import '../css/App.css';

class App extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchAllCategories, fetchAllPosts } = this.props;

    fetchAllCategories();
    fetchAllPosts();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="app">
        <Header
          categories={categories}
          currentPath={this.props.location.pathname}
        />

        <Route
          exact
          path="/:category?"
          render={props => (
            <PostsByCategory category={props.match.params.category} />
          )}
        />
        <Route
          exact
          path="/:category/:postId"
          render={props => <PostDetail postId={props.match.params.postId} />}
        />
        <Route
          exact
          path="/:category/:postId/edit"
          render={props => <PostEdit postId={props.match.params.postId} />}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, posts }) => ({
  categories,
  posts,
});

export default withRouter(connect(mapStateToProps, actions)(App));
