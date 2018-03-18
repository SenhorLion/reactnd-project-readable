import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';

class PostDetailView extends Component {
  render() {
    const { post, postId } = this.props;
    const categoryColour = getCategoryColour(post.category);
    const postItemClass = classNames(
      'ui  segment divided items post',
      categoryColour
    );
    const labelColour = classNames('ui label', categoryColour);
    const isPostLoaded = !!post;

    return (
      <div className="page-content">
        <div className="ui grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui container categories">
                <h2>Back Link</h2>
              </div>
            </div>
            <div className="thirteen wide column">
              <div className="ui container content">
                <div className="page-header">
                  <div className="page-header__title">
                    <h2 className="title align-left">Posts detail view</h2>
                  </div>
                </div>
                {isPostLoaded && (
                  <div className="content">
                    <h2 className="header">{capitalize(post.title)}</h2>
                    <div className="meta">
                      <span className="author">Author: {post.author}</span>
                      <span className="date">
                        <Moment fromNow>{post.timestamp}</Moment>
                      </span>
                    </div>
                    <div className="description">
                      <p>{post.body}</p>
                    </div>
                    <div className="extra">
                      <div className={labelColour}>
                        <Link to={`/${post.category}`}>{post.category}</Link>
                        {/* {post.category} */}
                      </div>
                      <div className="ui label">
                        <i className="like icon" /> {post.voteScore}
                      </div>
                      <div className="ui label">
                        <i className="comment alternate outline icon" />{' '}
                        {post.commentCount}
                      </div>
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

export default PostDetailView;
