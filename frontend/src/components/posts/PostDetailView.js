import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loading from 'react-loading';
import classNames from 'classnames';
import { capitalize, getCategoryColour } from '../../utils/helper';

const PostDetailView = ({ post, postId }) => {
  console.log('postId', postId);
  console.log('post', post);

  const categoryColour = getCategoryColour(post && post.category) || 'grey';
  const labelColour = classNames('ui label', categoryColour);
  const isPostLoaded = !!post;

  console.log('isPostLoaded', isPostLoaded);

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
              {!isPostLoaded && (
                <Loading
                  delay={200}
                  type="spokes"
                  color="#222"
                  className="loading"
                />
              )}
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
};

export default PostDetailView;
