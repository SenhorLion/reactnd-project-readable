import React, { Component } from 'react';
import cuid from 'cuid';
import classNames from 'classnames';
import Button from '../button/Button';

// TODO(Lionel): Use redux-form to handle form state
class PostCommentFormControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      author: '',
    };
  }

  onSubmitComment = event => {
    event.preventDefault();

    const { body, author } = this.state;

    if (!body || !author) {
      return;
    }
    const {
      postId,
      onAddComment,
      fetchAllComments,
      fetchAllPosts,
    } = this.props;

    const newComment = {
      id: cuid(),
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: postId,
    };

    onAddComment(newComment).then(res => {
      return setTimeout(() => {
        fetchAllComments();
        fetchAllPosts();
      }, 200);
    });
  };

  // TODO: Add debounce method to minimise evtn calling
  onHandleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { categoryColour } = this.props;
    const { body, author } = this.state;

    const uiHeaderColourClass = classNames('ui header', categoryColour);
    const postCommentButtonClass = classNames(
      'ui submit labeled icon button',
      categoryColour
    );

    return (
      <form className="ui reply form" onSubmit={this.onSubmitComment}>
        <h3 className={uiHeaderColourClass}>
          <div className="content">Add comment</div>
        </h3>
        <div className="field">
          <input
            name="author"
            value={author}
            onChange={this.onHandleChange}
            placeholder="Author"
          />
        </div>
        <div className="field">
          <textarea
            name="body"
            value={body}
            onChange={this.onHandleChange}
            placeholder="Add a comment"
          />
        </div>

        <Button className={postCommentButtonClass} type="submit">
          <i className="comment icon" /> Add comment
        </Button>
      </form>
    );
  }
}

export default PostCommentFormControl;
