import React, { Component } from 'react';
import cuid from 'cuid';

import { capitalize } from '../../utils/helper';
import Button from '../ui/button/Button';

// TODO: Implement `redux-form` to handle form elements
class PostEditFormControl extends Component {
  constructor(props) {
    super(props);

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
    const { post } = this.props;

    this.setState({
      oldPost: { ...post },
      newPost: { ...post },
    });
  }

  onSubmitPost = event => {
    event.preventDefault();

    const { onSaveEditPost, fetchAllPosts } = this.props;

    const { oldPost, newPost } = this.state;

    const timestamp = Date.now();
    const editedPost = Object.assign({}, oldPost, newPost, {
      timestamp,
    });

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

    history.goBack();
  }

  // TODO: Add debounce method to minimise evtn calling
  onHandleChange = event => {
    const { name, value } = event.target;
    const { newPost } = this.state;

    this.setState({
      newPost: {
        ...newPost,
        [name]: value,
      },
    });
  };

  onHandleCancel = event => {
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

export default PostEditFormControl;
