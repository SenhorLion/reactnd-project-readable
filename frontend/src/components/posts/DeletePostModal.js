import React, { Component } from 'react';
import Modal from 'react-modal';

class DeletePostModal extends Component {
  constructor(props) {
    super(props);

    this.handleOnDeletePost = this.handleOnDeletePost.bind(this);
  }

  handleOnDeletePost = e => {
    const {
      postIdToDelete,
      onDeletePost,
      closeDeletePostModal,
      goBack,
    } = this.props;

    if (postIdToDelete) {
      onDeletePost(postIdToDelete).then(res => {
        closeDeletePostModal();

        if (goBack) {
          // TODO: Change to react-router history
          window.history.back();
        }
      });
    }
  };

  render() {
    const { isDeletePostModalOpen, closeDeletePostModal } = this.props;

    return (
      <Modal
        className="modal delete-post-modal"
        overlayClassName="overlay"
        isOpen={isDeletePostModalOpen}
        onRequestClose={closeDeletePostModal}
        contentLabel="Delete Post Modal"
      >
        <div className="delete-post-modal__content">
          <h1>Delete Post</h1>

          <p>Are you sure you want to delete this post?</p>

          <button
            onClick={() => this.handleOnDeletePost()}
            className="ui primary button"
          >
            Delete
          </button>
          <button onClick={() => closeDeletePostModal()} className="ui button">
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

export default DeletePostModal;
