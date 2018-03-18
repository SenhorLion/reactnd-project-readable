import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cuid from 'cuid';
import Loading from 'react-loading';

import { capitalize } from '../../utils/helper';

import sortFilter from '../../utils/sortFilter';
import PostsList from '../posts/PostsList';
import SortByControls from '../sort/SortByControls';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: null,
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

  render() {
    const { category, categories, posts /*, comments*/ } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const isNotPostsLoaded = !posts;
    const isNotCategoriesLoaded = !categories;
    const displayTitle = category ? `Posts for ${category}` : `All Posts`;

    return (
      <div className="page-content">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <h2 className="categories__title title align-center">
                  Categories
                </h2>
                {isNotCategoriesLoaded && (
                  <i className="spinner loading icon" />
                )}
                {/* 
                  TODO: - Add this to a categories component
                */}
                {categories && (
                  <div className="ui fluid vertical pointing menu">
                    {categories.map(cat => (
                      <Link
                        key={cuid()}
                        to={`/${cat.path}`}
                        className={`item ${cat.name === category && 'active'}`}
                      >
                        {capitalize(cat.name)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="thirteen wide column">
              <div className="ui container content">
                <div className="page-header">
                  <div className="page-header__title">
                    <h2 className="title align-left">{displayTitle}</h2>
                  </div>

                  <SortByControls
                    sortKey={sortKey}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                  />
                </div>

                <PostsList
                  list={posts}
                  sortKey={sortKey}
                  isSortReverse={isSortReverse}
                  sortFilter={sortFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
