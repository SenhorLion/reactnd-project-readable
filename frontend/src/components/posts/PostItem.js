import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { capitalize } from '../../utils/helper';

const PostItem = ({ post }) => (
  <div className="ui yellow segment divided items post">
    <div className="item">
      <div className="content">
        <a className="header">{capitalize(post.title)}</a>
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
          <div className="ui label">
            <Link to={post.category}>{post.category}</Link>
          </div>
          <div className="ui label">
            <i className="like icon" /> {post.voteScore}
          </div>
          <div className="ui label">
            <i className="comment alternate outline icon" /> {post.commentCount}
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default PostItem;
