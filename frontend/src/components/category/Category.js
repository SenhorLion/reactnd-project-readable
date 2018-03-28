import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cuid from 'cuid';
import Loading from 'react-loading';
// import Modal from 'react-modal';

import { capitalize } from '../../utils/helper';

import sortFilter from '../../utils/sortFilter';
import PostsList from '../posts/PostsList';
import AddNewPost from '../posts/AddNewPost';
import SortByControls from '../sort/SortByControls';
import Button from '../button/Button';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: null,
      sortKey: 'TIME_STAMP',
      isSortReverse: false,
      error: null,
      isAddPostModalOpen: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  }

  openAddPostModal = () => {
    console.log('openAddPostModal', this.props.category);
    this.setState(() => ({
      isAddPostModalOpen: true,
    }));
  };

  closeAddPostModal = () => {
    console.log('closeAddPostModal');
    this.setState(() => ({
      isAddPostModalOpen: false,
    }));
  };

  render() {
    const {
      category,
      categories,
      posts,
      onAddPost,
      onDeletePost,
      fetchAllPosts,
    } = this.props;

    const { isFetching, items } = posts;
    const { sortKey, isSortReverse, isAddPostModalOpen } = this.state;
    const isCategoriesLoaded = !!categories;
    const displayTitle = category ? `Posts for ${category}` : `All Posts`;

    const hasPosts = !!items.length;
    console.log(
      `isFetching: ${isFetching}, items: ${Object.values(items).map(
        post => post.title
      )}, hasPosts: ${hasPosts}`
    );

    return (
      <div className="page-content">
        <div class="ui stackable four column grid">
          <div class="six wide column">
            <div className="ui container categories">
              <h2 className="categories__title title align-center">
                Categories
              </h2>
              {!isCategoriesLoaded ? (
                <Loading
                  delay={200}
                  type="spokes"
                  color="#222"
                  className="loading"
                />
              ) : (
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

          <div class="ten wide column">
            <div className="ui container content">
              <div className="page-header">
                <div className="page-header__content">
                  <h2 className="page-header__title align-left">
                    {displayTitle}
                  </h2>
                  <Button
                    className="ui positive button button--add-post float-right"
                    onClick={() => this.openAddPostModal()}
                  >
                    Add Post
                  </Button>
                </div>

                {!isFetching &&
                  hasPosts && (
                    <SortByControls
                      sortKey={sortKey}
                      isSortReverse={isSortReverse}
                      onSort={this.onSort}
                    />
                  )}
              </div>

              {!isFetching && hasPosts ? (
                <PostsList
                  list={items}
                  sortKey={sortKey}
                  isSortReverse={isSortReverse}
                  sortFilter={sortFilter}
                  onDeletePost={onDeletePost}
                />
              ) : (
                <p>No posts to show</p>
              )}
            </div>
          </div>
        </div>

        <AddNewPost
          isAddPostModalOpen={isAddPostModalOpen}
          closeAddPostModal={this.closeAddPostModal}
          activeCategory={category}
          categories={categories}
          onAddPost={onAddPost}
          fetchAllPosts={fetchAllPosts}
        />
      </div>
    );
  }
}

export default Category;
