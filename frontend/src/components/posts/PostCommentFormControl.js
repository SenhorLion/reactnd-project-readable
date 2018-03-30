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

  // '894tuq4ut84ut8v4t8wun89g': {
  //     id: '894tuq4ut84ut8v4t8wun89g',
  //     parentId: '8xf0y6ziyjabvozdd253nd',
  //     timestamp: 1468166872634,
  //     body: 'Hi there! I am a COMMENT.',
  //     author: 'thingtwo',
  //     voteScore: 6,
  //     deleted: false,
  //     parentDeleted: false,
  //   },

  onSubmitComment = event => {
    event.preventDefault();

    const { postId, onAddComment, fetchAllComments } = this.props;
    const { body, author } = this.state;

    const newComment = {
      id: cuid(),
      timestamp: Date.now(),
      parentId: postId,
      body: body,
      author: author,
      voteScore: 0,
      deleted: false,
      parentDeleted: false,
    };

    onAddComment(newComment).then(res => {
      return setTimeout(() => {
        fetchAllComments();
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

  onHandleCancel = event => {
    console.log('@ onHandleCancel');
  };

  render() {
    const { categoryColour, postId } = this.props;
    const { body, author } = this.state;

    const uiHeaderColourClass = classNames('ui header', categoryColour);
    const postCommentButtonClass = classNames(
      'ui submit labeled icon button',
      categoryColour
    );

    return (
      <form className="ui reply form" onSubmit={this.onSubmitComment}>
        <h3 className={uiHeaderColourClass}>
          {/* <i className="comments icon" /> */}
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

        <Button
          onClick={() => console.log('Add Comment')}
          className={postCommentButtonClass}
          type="submit"
        >
          <i className="comment icon" /> Add comment
        </Button>
      </form>
    );
  }
}

export default PostCommentFormControl;
