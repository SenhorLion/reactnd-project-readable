import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cuid from 'cuid';
import classNames from 'classnames';
import { RenderInput, RenderTextarea } from '../../utils/form-input-components';

const validate = values => {
  const errors = {};

  if (!values.body) {
    errors.body = 'Required';
  }
  if (!values.author) {
    errors.author = 'Required';
  }

  return errors;
};

const CommentFormControl = ({
  postId,
  fetchAllPosts,
  fetchAllComments,
  onAddComment,
  categoryColour,
  handleSubmit,
  reset,
  pristine,
  submitting,
}) => {
  const isDisabled = pristine || submitting;
  const uiHeaderColourClass = classNames('ui header', categoryColour);
  const postCommentButtonClass = classNames(
    'ui submit labeled icon button',
    categoryColour,
    {
      disabled: isDisabled,
    }
  );

  const onHandleSubmit = values => {
    const { body, author } = values;

    const newComment = {
      id: cuid(),
      timestamp: Date.now(),
      body,
      author,
      parentId: postId,
    };

    onAddComment(newComment).then(res => {
      return setTimeout(() => {
        reset();
        fetchAllPosts();
      }, 200);
    });
  };

  const onHandleCancel = () => reset();

  return (
    <form className="ui reply form" onSubmit={handleSubmit(onHandleSubmit)}>
      <h3 className={uiHeaderColourClass}>
        <div className="content">Add comment</div>
      </h3>

      <Field
        name="author"
        label="Author"
        placeholder="Author"
        component={RenderInput}
      />

      <Field
        name="body"
        label="Body"
        placeholder="Body"
        component={RenderTextarea}
      />

      <button
        className={postCommentButtonClass}
        type="submit"
        disabled={isDisabled}
      >
        <i className="comment icon" /> Add comment
      </button>
      <button
        onClick={onHandleCancel}
        className="ui button"
        type="button"
        disabled={isDisabled}
      >
        Cancel
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'AddCommentForm',
  destroyOnUnmount: true,
  validate,
})(CommentFormControl);
