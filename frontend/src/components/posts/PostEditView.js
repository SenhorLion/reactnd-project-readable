import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loading from 'react-loading';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';

class PostEditView extends Component {
  constructor(props) {
    super(props);
    this.onEditPost = this.onEditPost.bind(this);
  }

  onEditPost(e) {
    e.preventDefault();

    const { post, postId, onSaveEditPost } = this.props;

    const title = this.refs.title.value;
    const body = this.refs.body.value;
    const voteScore = parseInt(this.refs.voteScore.value, 10);
    const timestamp = Date.now();
    const newPost = Object.assign({}, post, {
      body,
      timestamp,
      voteScore,
      title,
    });

    onSaveEditPost(postId, newPost);
  }

  render() {
    const { post, postId } = this.props;

    const isPostLoaded = !!post;

    const goBack = () => {
      return window.history.back();
    };

    console.log('isPostLoaded', isPostLoaded);

    return (
      <div className="page-content">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <a onClick={() => goBack()} className="back-link">
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
                        <h2>Edit: {capitalize(post.title)}</h2>
                        <p>
                          <span className="author">Author: {post.author}</span>
                        </p>
                      </div>
                    </div>

                    <div className="post-form-content">
                      <form ref="postForm" onSubmit={this.onEditPost}>
                        <input
                          type="text"
                          ref="title"
                          defaultValue={post.title}
                        />
                        <input
                          type="text"
                          ref="body"
                          defaultValue={post.body}
                        />
                        <input
                          type="text"
                          ref="voteScore"
                          defaultValue={post.voteScore}
                        />

                        <input type="submit" />
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
