import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import cuid from 'cuid';

import {
  RenderInput,
  RenderTextarea,
  RenderSelect,
} from '../../utils/form-input-components';

import Button from '../ui/button/Button';
import { capitalize, getCategoryColour } from '../../utils/helper';

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

class PostEditFormControl extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize = () => {
    const { initialize, post } = this.props;
    const initFormData = {
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
    };

    initialize(initFormData);
  };

  onHandleSubmit = values => {
    const { onSaveEditPost, fetchAllPosts, post } = this.props;
    const { title, body, author, category } = values;

    const newPost = {
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    };

    const editedPost = Object.assign({}, post, newPost);

    onSaveEditPost(editedPost).then(res =>
      setTimeout(() => {
        fetchAllPosts();

        // TODO: navigate to the new category instead of 'back'
        // If the category has been changed?,
        this.onGoBack();
      }, 200)
    );
  };

  onGoBack() {
    const { history } = this.props;

    history.goBack();
  }

  onHandleCancel = event => {
    this.onGoBack();
  };

  render() {
    const {
      handleSubmit,
      submitting,
      categories,
      post: { category },
    } = this.props;
    const categoryColour = getCategoryColour(category);
    const isDisabled = !!submitting;
    const uiSubmitButtonClass = classNames('ui button', categoryColour, {
      positive: !category,
      disabled: !!submitting,
    });

    return (
      <div className="post-form-content">
        <h1 className={`ui header ${categoryColour} title`}>
          <i className="edit icon" />
          Edit Post
        </h1>
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
            isShowLabel={true}
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
            className="ui button"
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
  form: 'EditPostForm',
  destroyOnUnmount: true,
  validate,
})(PostEditFormControl);
