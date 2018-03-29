import React, { Component } from 'react';
import cuid from 'cuid';

import { capitalize } from '../../utils/helper';
import Button from '../button/Button';

class PostFormControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
      selectedCategory: this.props.selectedCategory,
    };

    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  onEditPost(e) {
    e.preventDefault();

    const { post, onSaveEditPost, fetchAllPosts } = this.props;

    const { selectedCategory, title, body, author } = this.state;

    const timestamp = Date.now();
    const newPost = Object.assign({}, post, {
      body,
      author,
      category: selectedCategory,
      timestamp,
      title,
    });

    onSaveEditPost(newPost).then(res =>
      setTimeout(() => {
        fetchAllPosts();

        // TODO: navigate to the new category instead of 'back'
        // If the category has been changed,
        this.onGoBack();
      }, 200)
    );
  }

  onGoBack() {
    const { history } = this.props;

    // return window.history.back();
    history.goBack();
  }

  onSubmitPost(e) {
    e.preventDefault();
    console.log('@ onAddPost');
    const { selectedCategory, title, body, author } = this.state;

    // TODO: handle form empty / incomplete state
    // eg: isFormValid({...formState})
    if (!title) {
      console.error('Pleasse fil in form');
      return;
    }
    const { closeAddPostModal, onAddPost, fetchAllPosts } = this.props;

    console.log(`
    selectedCategory ${selectedCategory}
    title ${title}
    body ${body}
    author ${author}`);

    const newPost = {
      id: cuid(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category: selectedCategory,
      voteScore: 0,
      deleted: false,
      commentCount: 0,
    };

    console.log('new Post', newPost);

    onAddPost(newPost).then(res => {
      console.log('posted then', res);

      return setTimeout(() => {
        fetchAllPosts();

        closeAddPostModal();
        // TODO: navigate to category route
        this.onNavigateToCategory(newPost);
      }, 200);
    });
  }

  onNavigateToCategory({ category, id }) {
    const { history } = this.props;

    console.log(`onNavigateToCategory: ${category}/${id}`);

    // return window.history.back();
    // history.goBack();
    history.push(`/${category}/${id}`);
  }

  // TODO: Add debounce method to minimise evtn calling
  onHandleChange = event => {
    console.log('@ onHandleChange');

    const { name, value } = event.target;

    console.log(`name: ${name}, value: ${value}`);

    this.setState({
      [name]: value,
    });
  };

  onHandleCancel = event => {
    console.log('@ onHandleCancel');

    const { closeAddPostModal } = this.props;

    this.setState(() => ({
      selectedCategory: this.props.selectedCategory,
    }));

    closeAddPostModal();
  };

  render() {
    const { selectedCategory, title, body, author } = this.state;
    const { categories } = this.props;

    return (
      <div className="post-form-content">
        <h1>Add New Post </h1>
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
              value={selectedCategory}
              name="selectedCategory"
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

export default PostFormControl;
