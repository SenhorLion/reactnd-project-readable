import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import cuid from 'cuid';
import Loading from 'react-loading';

import { capitalize } from '../../utils/helper';

import sortFilter from '../../utils/sortFilter';
import PostsList from '../posts/PostsList';
import SortByControls from '../sort/SortByControls';
import Header from '../header/Header';

// TODO: Add colourMap to module
// maps category to a specific colour
const colorMap = {
  react: 'pink',
  redux: 'yellow',
  udacity: 'green',
};

class Home extends Component {
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

  componentDidMount() {}

  render() {
    const { categories, posts, comments } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const isNotCategoriesLoaded = !categories.length;

    const allPosts = Object.values(posts);

    return (
      <div className="home-view">
        <div className="ui grid">
          <div className="row">
            <div className="column">
              <div className="ui container nav-breadcrumb">
                {/*UI Header*/}/ breadcrumb / nav / goes / here
              </div>
            </div>
          </div>

          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <h2 className="title align-center">Categories</h2>
                {isNotCategoriesLoaded && (
                  <i className="spinner loading icon" />
                )}
                {/* {isNotCategoriesLoaded && (
                  <Loading
                    delay={200}
                    type="spin"
                    color="#222"
                    className="loading"
                  />
                )} */}

                {categories &&
                  categories.map(cat => (
                    <h3 key={cuid()} className="item">
                      <Link to={`/${cat.path}`} className="item">
                        {capitalize(cat.name)}
                      </Link>
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

                {isNotCategoriesLoaded && (
                  <Loading
                    delay={200}
                    type="spin"
                    color="#222"
                    className="loading"
                  />
                )}

                {allPosts && (
                  <PostsList
                    list={allPosts}
                    sortKey={sortKey}
                    isSortReverse={isSortReverse}
                    sortFilter={sortFilter}
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

export default Home;
