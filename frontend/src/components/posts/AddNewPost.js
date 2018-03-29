import React, { Component } from 'react';
import Modal from 'react-modal';
import PostFormControl from './PostFormControl';

class AddNewPost extends Component {
  render() {
    const {
      isAddPostModalOpen,
      categories,
      selectedCategory,
      closeAddPostModal,
      onAddPost,
      fetchAllPosts,
      history,
    } = this.props;

    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={isAddPostModalOpen}
        onRequestClose={closeAddPostModal}
        contentLabel="Modal"
      >
        <PostFormControl
          history={history}
          categories={categories}
          selectedCategory={selectedCategory}
          closeAddPostModal={closeAddPostModal}
          onAddPost={onAddPost}
          fetchAllPosts={fetchAllPosts}
        />
      </Modal>
    );
  }
}

export default AddNewPost;
