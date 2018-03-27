import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loading from 'react-loading';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';
import Button from '../button/Button';

class PostEditView extends Component {
  constructor(props) {
    super(props);
    this.onEditPost = this.onEditPost.bind(this);
    this.onGoBack = this.onGoBack.bind(this);
  }

  onEditPost(e) {
    e.preventDefault();

    const { post, postId, onSaveEditPost } = this.props;

    const title = this.refs.title.value;
    const body = this.refs.body.value;
    const author = this.refs.author.value;
    const voteScore = parseInt(this.refs.voteScore.value, 10);
    const timestamp = Date.now();
    const newPost = Object.assign({}, post, {
      body,
      author,
      timestamp,
      voteScore,
      title,
    });

    onSaveEditPost(newPost).then(res =>
      setTimeout(() => {
        this.onGoBack();
      }, 200)
    );
  }

  onGoBack() {
    return window.history.back();
  }

  render() {
    const { post, postId } = this.props;

    const isPostLoaded = !!post;

    return (
      <div className="page-content">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <a onClick={() => this.onGoBack()} className="back-link">
                  <i className="big arrow left icon" />
                </a>
              </div>
            </div>
            <div className="thirteen wide column">
              <div className="ui container content">
                {!isPostLoaded && (
                  <Loading
                    delay={200}
                    type="spokes"
                    color="#222"
                    className="loading"
                  />
                )}
                {isPostLoaded && (
                  <div className="post-details-form">
                    <div className="page-header">
                      <div className="page-header__title">
                        <h2 className="title">
                          <i className="edit icon" />
                          Edit Post: {capitalize(post.title)}
                        </h2>
                      </div>
                    </div>

                    <div className="post-form-content">
                      <form
                        ref="postForm"
                        onSubmit={this.onEditPost}
                        className="ui form post-form-content"
                      >
                        <div className="field">
                          <label>Title</label>
                          <input
                            type="text"
                            name="title"
                            ref="title"
                            defaultValue={post.title}
                            placeholder="Title"
                          />
                        </div>
                        <div className="field">
                          <label>Author</label>
                          <input
                            type="text"
                            ref="author"
                            defaultValue={post.author}
                          />
                        </div>
                        <div className="field">
                          <label>Body</label>
                          <input
                            type="text"
                            name="body"
                            ref="body"
                            defaultValue={post.body}
                            placeholder="Body"
                          />
                        </div>
                        <div className="field">
                          <label>Vote score</label>
                          <input
                            type="text"
                            ref="voteScore"
                            defaultValue={post.voteScore}
                          />
                        </div>

                        <Button className="ui positive button" type="submit">
                          Submit
                        </Button>
                        <Button
                          onClick={() => this.onGoBack()}
                          className="ui button"
                        >
                          Cancel
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostEditView;
