import React, { Component } from 'react';
import Modal from 'react-modal';

import { capitalize, getCategoryColour } from '../../utils/helper';

import sortFilter from '../../utils/sortFilter';
import PostList from '../posts/PostList';
import AddNewPost from '../posts/AddNewPost';
import DeletePostModal from '../posts/DeletePostModal';
import SortByControls from '../ui/sort/SortByControls';
import Button from '../ui/button/Button';
import NotificationMessage from '../ui/notification/NotificationMessage';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'TIME_STAMP',
      isSortReverse: false,
      error: null,
      isAddPostModalOpen: false,
      isDeletePostModalOpen: false,
      postIdToDelete: null,
    };
  }

  componentDidMount() {
    /**
     * Remove `react-modal` warning:
     * App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`.
     * This is needed so screen readers don't see main content when modal is opened.
     * It is not recommended, but you can opt-out by setting `ariaHideApp={false}`.
     */
    Modal.setAppElement('#root');
  }

  onSort = sortKey => {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  };

  openAddPostModal = () => {
    this.setState(() => ({
      isAddPostModalOpen: true,
    }));
  };

  closeAddPostModal = () => {
    this.setState(() => ({
      isAddPostModalOpen: false,
    }));
  };

  openDeletePostModal = postId => {
    this.setState(() => ({
      isDeletePostModalOpen: true,
      postIdToDelete: postId,
    }));
  };

  closeDeletePostModal = () => {
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

    const displayTitle = category
      ? `Posts for ${capitalize(category)}`
      : `All Posts`;
    const categoryColour = getCategoryColour(category);

    const hasPosts = !isFetching && !!Object.keys(items).length;

    return (
      <div className="page-content">
        <div className="ui stackable two column grid">
          <div className="sixteen wide column">
            <div className="ui container content">
              <div className="page-header">
                <div className="page-header__content">
                  <h2
                    className={`ui header ${categoryColour} page-header__title align-left`}
                  >
                    {displayTitle}
                  </h2>
                  <Button
                    className="ui button button--add-post float-right"
                    onClick={() => this.openAddPostModal()}
                  >
                    <i className="pencil alternate icon" /> Add Post
                  </Button>
                </div>

                {hasPosts && (
                  <SortByControls
                    sortKey={sortKey}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                  />
                )}
              </div>

              {hasPosts ? (
                <PostList
                  list={items}
                  sortKey={sortKey}
                  isSortReverse={isSortReverse}
                  sortFilter={sortFilter}
                  onDeletePost={onDeletePost}
                  openDeletePostModal={this.openDeletePostModal}
                />
              ) : (
                <NotificationMessage
                  message="No posts to show"
                  category={category}
                  categoryColour={categoryColour}
                />
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
