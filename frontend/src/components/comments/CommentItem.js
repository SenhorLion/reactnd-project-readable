import React, { Component } from 'react';
import Moment from 'react-moment';
import classNames from 'classnames';

import Button from '../button/Button';
import ReactionComments from '../reaction/ReactionComments';

// TODO: Plugin redux-form to handle editing
class CommentItem extends Component {
  state = {
    isEditMode: false,
    commentBody: '',
  };

  componentDidMount() {
    const { comment: { body } } = this.props;

    this.setState({
      commentBody: body,
    });
  }

  onHandleDelete = commentId => {
    const { openDeleteCommentModal } = this.props;

    openDeleteCommentModal(commentId);
  };

  onSubmitComment = event => {
    event.preventDefault();

    const { commentBody } = this.state;

    if (!commentBody) {
      this.cancelEditMode();
      return;
    }
    const { comment, onEditComment, fetchAllPosts } = this.props;

    const timestamp = Date.now();
    const newComment = {
      ...comment,
      timestamp,
      body: commentBody,
    };

    onEditComment(newComment).then(res => {
      this.cancelEditMode();
      fetchAllPosts();
    });
  };

  onHandleEdit = commentId => {
    this.setState(prevState => ({
      isEditMode: true,
    }));
  };

  cancelEditMode = () => {
    this.setState(prevState => ({
      isEditMode: false,
    }));
  };

  onHandleCancel = event => {
    this.cancelEditMode();
  };

  onHandleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { comment, categoryColour } = this.props;

    const { id, timestamp, body, author } = comment;

    const { isEditMode, commentBody } = this.state;

    const userIconClass = classNames('user big icon', categoryColour);

    return (
      <div className="comment">
        <a className="avatar">
          <i className={userIconClass} />
        </a>
        <div className="content post-comment__content">
          {!isEditMode ? (
            <div>
              <span className="author">{author}</span>
              <div className="metadata">
                <div className="date">
                  <Moment fromNow>{timestamp}</Moment>
                </div>
              </div>
              <div className="text">
                <p>{body}</p>
              </div>
            </div>
          ) : (
            <div>
              <form
                onSubmit={this.onSubmitComment}
                className="ui form comment-form-content"
              >
                <div className="field">
                  <label>Edit comment</label>
                  <textarea
                    type="text"
                    name="commentBody"
                    value={commentBody}
                    placeholder="Body"
                    onChange={this.onHandleChange}
                  />
                </div>
                <Button className="ui positive button" type="submit">
                  Submit
                </Button>
                <Button
                  onClick={this.onHandleCancel}
                  className="ui button"
                  type="button"
                >
                  Cancel
                </Button>
              </form>
            </div>
          )}
          <div className="actions">
            {!isEditMode && (
              <div>
                <ReactionComments
                  categoryColour={categoryColour}
                  itemId={id}
                  classNameProp="ui label reaction--comment"
                />
                <a
                  onClick={() => this.onHandleEdit(id)}
                  className="edit-comment"
                >
                  Edit
                </a>
                <a onClick={() => this.onHandleDelete(id)} className="delete">
                  Delete
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
