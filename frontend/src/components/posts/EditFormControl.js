import React, { Component } from 'react';
import cuid from 'cuid';

import { capitalize } from '../../utils/helper';
import Button from '../button/Button';

class EditFormControl extends Component {
  constructor(props) {
    super(props);

    console.log('@Constructor::EditFormControl');

    this.state = {
      oldPost: {},
      newPost: {
        title: '',
        body: '',
        author: '',
        selectedCategory: '',
      },
    };

    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  componentDidMount() {
    console.log('@ onComponentDidMount');

    const { post } = this.props;

    this.setState({
      oldPost: { ...post },
      newPost: { ...post },
      //   title: post.title,
      //   body: post.body,
      //   author: post.author,
      //   selectedCategory: post.category,
    });
  }

  onSubmitPost = event => {
    event.preventDefault();

    const { onSaveEditPost, fetchAllPosts } = this.props;

    // const { selectedCategory, title, body, author } = this.state;
    const { oldPost, newPost } = this.state;

    const timestamp = Date.now();
    const editedPost = Object.assign({}, oldPost, newPost, {
      timestamp,
    });

    console.log(
      `newPost: ${JSON.stringify(newPost)}, editedPost: ${JSON.stringify(
        editedPost
      )}`
    );

    onSaveEditPost(editedPost).then(res =>
      setTimeout(() => {
        fetchAllPosts();

        // TODO: navigate to the new category instead of 'back'
        // If the category has been changed,
        this.onGoBack();
      }, 200)
    );
  };

  onGoBack() {
    const { history } = this.props;
    const { newPost: { category, id } } = this.state;

    // return window.history.back();
    // history.push(`/${category}/${id}`);
    history.goBack();
  }

  // TODO: Add debounce method to minimise evtn calling
  onHandleChange = event => {
    console.log('@ onHandleChange');

    const { name, value } = event.target;
    const { newPost } = this.state;

    console.log(`name: ${name}, value: ${value}`);

    this.setState({
      newPost: {
        ...newPost,
        [name]: value,
      },
    });
  };

  onHandleCancel = event => {
    console.log('@ onHandleCancel');

    const { oldPost } = this.state;

    // Just reset state
    this.setState(() => ({
      newPost: {
        ...oldPost,
      },
    }));

    this.onGoBack();
  };

  render() {
    const { newPost: { category, title, body, author } } = this.state;
    const { categories } = this.props;

    return (
      <div className="post-form-content">
        <h1 className="title">
          <i className="edit icon" />
          Edit Post
        </h1>
        <form
          onSubmit={this.onSubmitPost}
          className="ui form post-form-content"
        >
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={this.onHandleChange}
            />
          </div>

          <div className="field">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={author}
              placeholder="Author"
              onChange={this.onHandleChange}
            />
          </div>

          <div className="field">
            <label>Post content</label>
            <textarea
              name="body"
              value={body}
              placeholder="Post content"
              onChange={this.onHandleChange}
            />
          </div>
          <div className="field">
            <label>Category</label>

            <select
              className="ui search dropdown"
              value={category}
              name="category"
              onChange={this.onHandleChange}
            >
              {categories &&
                categories.map(item => (
                  <option key={cuid()} value={item.name}>
                    {capitalize(item.name)}
                  </option>
                ))}
            </select>
          </div>

          <Button className="ui positive button" type="submit">
            Submit
          </Button>
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

export default EditFormControl;
