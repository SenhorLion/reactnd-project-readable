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

const colorMap = {
  react: 'pink',
  redux: 'yellow',
  udacity: 'green',
};
class App extends Component {
  state = {
    error: null,
  };

  componentDidMount() {
    this.props.dispatch(fetchAllCategories());
    this.props.dispatch(fetchAllPosts());
    this.props.dispatch(fetchAllComments());
    // this.props.dispatch(fetchPostComments());
  }

  render() {
    const { categories, posts, comments } = this.props;

    const isNotCategoriesLoaded = !categories.length;

    const allPosts = Object.values(posts);

    console.log('categories', categories.length);
    console.log('isNotCategoriesLoaded', isNotCategoriesLoaded);
    console.log('App::categories', categories);

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
                <h2 className="page__title align-center">Categories</h2>
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
              {/* '8xf0y6ziyjabvozdd253nd': {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: 'Udacity is the best place to learn React',
                body: 'Everyone says so after all.',
                author: 'thingtwo',
                category: 'react',
                voteScore: 6,
                deleted: false,
                commentCount: 2,
              } 
            */}
              <div className="ui container content">
                {/* <h2 class="header">
                  Posts <span className="filter">Filter: </span>
                </h2> */}

                <div className="ui container">
                  <h2 className="page__title align-left">Posts</h2>
                </div>

                {allPosts &&
                  allPosts.map(post => (
                    <div
                      key={cuid()}
                      className="ui yellow segment divided items post"
                    >
                      <div className="item">
                        <div className="content">
                          <a className="header">{capitalize(post.title)}</a>
                          <div className="meta">
                            <span className="author">{post.author}</span>
                            <span className="author">
                              <Moment fromNow>{post.timestamp}</Moment>
                            </span>
                          </div>
                          <div className="description">
                            <p>{post.body}</p>
                          </div>
                          <div className="extra">
                            <div className="ui label">{post.category}</div>
                            <div className="ui label">
                              <i className="like icon" /> {post.voteScore}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

// Here in `mapStateToProps` I want to convert the `posts` from an array of objects into
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
  comments,
});

// connect([ mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(Component);

export default connect(mapStateToProps)(App);
