import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cuid from 'cuid';

import { capitalize } from '../../utils/helper';
import {
  RenderInput,
  RenderTextarea,
  RenderSelect,
} from '../../utils/form-input-components';
import Button from '../button/Button';

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.author) {
    errors.author = 'Required';
  }
  if (!values.body) {
    errors.body = 'Required';
  }
  if (!values.category) {
    errors.category = 'Required';
  }

  return errors;
};

const PostFormControl = ({
  handleSubmit,
  pristine,
  submitting,
  reset,
  initialize,
  closeAddPostModal,
  categories,
  onAddPost,
  fetchAllPosts,
  history,
}) => {
  const isDisabled = pristine || submitting;
  const onHandleCancel = () => closeAddPostModal();

  const onHandleSubmit = values => {
    const { title, body, author, category } = values;

    const newPost = {
      id: cuid(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    };

    onAddPost(newPost).then(res => {
      return setTimeout(() => {
        reset(); // Resets the form to pristine state!
        fetchAllPosts();
        closeAddPostModal();
        onNavigateToCategory(newPost);
      }, 200);
    });
  };

  const onNavigateToCategory = ({ category, id }) => {
    history.push(`/${category}/${id}`);
  };

  return (
    <div className="post-form-content">
      <h1>
        <i className="pencil alternate icon" /> Add New Post{' '}
      </h1>
      <form
        className="ui form post-form-content"
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <Field
          name="title"
          label="Title"
          placeholder="Title"
          component={RenderInput}
        />

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
        <Field
          name="category"
          label="Category"
          placeholder="Category"
          component={RenderSelect}
        >
          <option value="">Select category</option>
          {categories &&
            categories.map(item => (
              <option key={cuid()} value={item.name}>
                {capitalize(item.name)}
              </option>
            ))}
        </Field>

        <button
          className={`ui positive button${submitting ? ' disabled' : ''}`}
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
        <Button onClick={onHandleCancel} className="ui  button" type="button">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'AddPostForm',
  destroyOnUnmount: true,
  validate,
})(PostFormControl);
