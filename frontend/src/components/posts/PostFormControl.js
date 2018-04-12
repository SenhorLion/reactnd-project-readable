import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import cuid from 'cuid';
import classNames from 'classnames';

import { capitalize } from '../../utils/helper';
import {
  RenderInput,
  RenderTextarea,
  RenderSelect,
} from '../../utils/form-input-components';
import Button from '../ui/button/Button';

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

class PostFormControl extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize = () => {
    const { category, initialize } = this.props;
    const initFormData = {
      category: category,
    };

    initialize(initFormData);
  };

  onHandleCancel = () => {
    const { closeAddPostModal } = this.props;
    closeAddPostModal();
  };

  onHandleSubmit = values => {
    const { onAddPost, reset, fetchAllPosts, closeAddPostModal } = this.props;
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
        this.navigateToCategory(newPost);
      }, 200);
    });
  };

  navigateToCategory = ({ category, id }) => {
    const { history } = this.props;
    history.push(`/${category}/${id}`);
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      categories,
      category,
      categoryColour,
    } = this.props;

    const isDisabled = pristine || submitting;
    const uiSubmitButtonClass = classNames('ui button', categoryColour, {
      positive: !category,
      submitting: 'disabled',
    });

    return (
      <div className="post-form-content">
        <h1 className={`ui header ${categoryColour}`}>Add New Post </h1>
        <form
          className="ui form post-form-content"
          onSubmit={handleSubmit(this.onHandleSubmit)}
        >
          <Field
            name="title"
            label="Title"
            isShowLabel={true}
            placeholder="Title"
            component={RenderInput}
          />

          <Field
            name="author"
            label="Author"
            isShowLabel={true}
            placeholder="Author"
            component={RenderInput}
          />

          <Field
            name="body"
            label="Body"
            isShowLabel={true}
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
            className={uiSubmitButtonClass}
            type="submit"
            disabled={isDisabled}
          >
            Submit
          </button>
          <Button
            onClick={this.onHandleCancel}
            className="ui  button"
            type="button"
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AddPostForm',
  destroyOnUnmount: true,
  validate,
})(PostFormControl);
