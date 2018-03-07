import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import cuid from 'cuid';

import './App.css';
import { capitalize } from '../../utils/helper';
import { fetchAllCategories } from '../../actions/category-action-creators';
import { fetchAllPosts } from '../../actions/post-action-creators';
import {
  fetchAllComments,
  fetchPostComments,
} from '../../actions/comment-action-creators';
import sortFilter from '../../utils/sortFilter';
import PostsList from '../posts/PostsList';
import SortByControls from '../sort/SortByControls';

// TODO Add to module
const colorMap = {
  react: 'pink',
  redux: 'yellow',
  udacity: 'green',
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
      error: null,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  }

  componentDidMount() {
    this.props.dispatch(fetchAllCategories());
    this.props.dispatch(fetchAllPosts());
    this.props.dispatch(fetchAllComments());
    // this.props.dispatch(fetchPostComments());
  }

  render() {
    const { categories, posts, comments } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const isNotCategoriesLoaded = !categories.length;

    const allPosts = Object.values(posts);

    return (
      <div className="app">
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="#" className="header item">
              <i className="logo inverted quote left icon" />
              READABLE
            </a>

            <div className="ui simple dropdown item">
              Categories <i className="dropdown icon" />
              <div className="menu">
                {categories &&
                  categories.map(cat => (
                    <a key={cuid()} className="item" href="#">
                      {capitalize(cat.name)}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ui grid">
          <div className="row">
            <div className="column">
              <div className="ui container">{/*UI Header*/}</div>
            </div>
          </div>

          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <h2 className="title align-center">Categories</h2>
                {isNotCategoriesLoaded && (
                  <i className="spinner loading icon" />
                )}

                {categories &&
                  categories.map(cat => (
                    <h3 key={cuid()} className="item" href="#">
                      {capitalize(cat.name)}
                    </h3>
                  ))}
              </div>
            </div>
            <div className="thirteen wide column">
              <div className="ui container content">
                {/* <h2 class="header">
                  Posts <span className="filter">Filter: </span>
                </h2> */}

                <div className="page-header">
                  <div className="page-header__title">
                    <h2 className="title align-left">Posts</h2>
                  </div>

                  <SortByControls
                    sortKey={sortKey}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                  />
                </div>

                {allPosts && (
                  <PostsList
                    list={allPosts}
                    sortKey={sortKey}
                    isSortReverse={isSortReverse}
                    sortFilter={sortFilter}
                    onSort={this.onSort}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(App);
