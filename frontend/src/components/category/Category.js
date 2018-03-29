import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cuid from 'cuid';
import Loading from 'react-loading';
import Modal from 'react-modal';

import { capitalize } from '../../utils/helper';

import sortFilter from '../../utils/sortFilter';
import PostsList from '../posts/PostsList';
import AddNewPost from '../posts/AddNewPost';
import DeletePostModal from '../posts/DeletePostModal';
import SortByControls from '../sort/SortByControls';
import Button from '../button/Button';

/**
 * Remove `react-modal` warning:
 * App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`.
 * This is needed so screen readers don't see main content when modal is opened.
 * It is not recommended, but you can opt-out by setting `ariaHideApp={false}`.
 */
Modal.setAppElement('#root');

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: null,
      sortKey: 'TIME_STAMP',
      isSortReverse: false,
      error: null,
      isAddPostModalOpen: false,
      isDeletePostModalOpen: false,
      postIdToDelete: null,
    };

    this.onSort = this.onSort.bind(this);
    this.openDeletePostModal = this.openDeletePostModal.bind(this);
    this.closeDeletePostModal = this.closeDeletePostModal.bind(this);
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

  openDeletePostModal(postId) {
    console.log('@ openDeletePostModal', postId);

    this.setState(() => ({
      isDeletePostModalOpen: true,
      postIdToDelete: postId,
    }));
  }

  closeDeletePostModal = () => {
    console.log('@ closeDeletePostModal');

    this.setState(() => ({
      isDeletePostModalOpen: false,
      postIdToDelete: null,
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
      history,
    } = this.props;

    const { isFetching, items } = posts;
    const {
      sortKey,
      isSortReverse,
      isAddPostModalOpen,
      isDeletePostModalOpen,
      postIdToDelete,
    } = this.state;
    const isCategoriesLoaded = !!categories;
    const displayTitle = category ? `Posts for ${category}` : `All Posts`;

    const hasPosts = !!items.length;

    return (
      <div className="page-content">
        <div className="ui stackable four column grid">
          <div className="six wide column">
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
                  <Link
                    key={cuid()}
                    to={`/`}
                    className={`item ${!category && 'active'}`}
                  >
                    All Categories
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="ten wide column">
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
                  openDeletePostModal={this.openDeletePostModal}
                />
              ) : (
                <p>
                  No posts to show {category && `for ${capitalize(category)}`}
                </p>
              )}
            </div>
          </div>
        </div>

        <AddNewPost
          history={history}
          isAddPostModalOpen={isAddPostModalOpen}
          closeAddPostModal={this.closeAddPostModal}
          selectedCategory={category}
          categories={categories}
          onAddPost={onAddPost}
          fetchAllPosts={fetchAllPosts}
        />

        <DeletePostModal
          isDeletePostModalOpen={isDeletePostModalOpen}
          closeDeletePostModal={this.closeDeletePostModal}
          onDeletePost={onDeletePost}
          postIdToDelete={postIdToDelete}
        />
      </div>
    );
  }
}

export default Category;
