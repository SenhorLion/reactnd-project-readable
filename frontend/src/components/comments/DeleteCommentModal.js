import React from 'react';
import Modal from 'react-modal';

const DeleteCommentModal = ({
  commentIdToDelete,
  isDeleteCommentModalOpen,
  closeDeleteCommentModal,
  onDeleteComment,
  fetchAllPosts,
}) => {
  const onHandleDelete = commentId => {
    onDeleteComment(commentId).then(res => {
      fetchAllPosts();
      closeDeleteCommentModal();
    });
  };
  return (
    <Modal
      className="modal delete-comment-modal"
      overlayClassName="overlay"
      isOpen={isDeleteCommentModalOpen}
      onRequestClose={closeDeleteCommentModal}
      contentLabel="Delete Comment Modal"
    >
      <div className="delete-post-modal__content">
        <h1>Delete Comment</h1>

        <p>Are you sure you want to delete this comment?</p>

        <button
          onClick={() => onHandleDelete(commentIdToDelete)}
          className="ui primary button"
        >
          Delete
        </button>
        <button onClick={() => closeDeleteCommentModal()} className="ui button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;
