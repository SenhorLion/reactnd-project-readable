import React, { Component } from 'react';
import Modal from 'react-modal';
import cuid from 'cuid';
import { capitalize } from '../../utils/helper';

class AddNewPost extends Component {
  constructor(props) {
    super(props);

    this.onSubmitPost = this.onSubmitPost.bind(this);
  }
  onSubmitPost(e) {
    e.preventDefault();
    console.log('@ onAddPost');

    // TODO: handle form empty or incomplete
    if (!this.refs.title.value) {
      return;
    }
    const { closeAddPostModal, onAddPost, fetchAllPosts } = this.props;

    const newPost = {
      id: cuid(),
      timestamp: Date.now(),
      title: this.refs.title.value,
      body: this.refs.body.value,
      author: this.refs.author.value,
      category: this.refs.category.value,
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
      }, 200);
    });
  }

  render() {
    const {
      isAddPostModalOpen,
      activeCategory,
      categories,
      closeAddPostModal,
    } = this.props;

    // Post data:
    // {
    //     id: '8xf0y6ziyjabvozdd253nd',
    //     timestamp: 1467166872634,
    //     title: 'Udacity is the best place to learn React',
    //     body: 'Everyone says so after all.',
    //     author: 'thingtwo',
    //     category: 'react',
    //     voteScore: 6,
    //     deleted: false,
    //     commentCount: 2,
    //   }

    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={isAddPostModalOpen}
        onRequestClose={closeAddPostModal}
        contentLabel="Modal"
      >
        <div className="post-form-content">
          <h1>Add New Post </h1>
          <form
            ref="addPostForm"
            onSubmit={this.onSubmitPost}
            className="ui form post-form-content"
          >
            <div className="field">
              <label>Title</label>
              <input type="text" name="title" ref="title" placeholder="Title" />
            </div>
            <div className="field">
              <label>Author</label>
              <input type="text" ref="author" placeholder="Author" />
            </div>
            <div className="field">
              <label>Post content</label>

              <textarea name="body" ref="body" placeholder="Post content" />
            </div>
            <div className="field">
              <label>Category</label>

              <select class="ui search dropdown" name="category" ref="category">
                {categories &&
                  categories.map(cat => (
                    <option key={cuid()} value={cat.name} ref="category">
                      {capitalize(cat.name)}
                    </option>
                  ))}
              </select>
            </div>

            <button className="ui primary button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default AddNewPost;
