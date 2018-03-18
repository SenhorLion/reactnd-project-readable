import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';

import { capitalize, getCategoryColour } from '../../utils/helper';

const PostItem = ({ post }) => {
  const categoryColour = getCategoryColour(post.category);
  const postItemClass = classNames(
    'ui  segment divided items post',
    categoryColour
  );
  const labelColour = classNames('ui label', categoryColour);

  return (
    <div className={postItemClass}>
      <div className="item">
        <div className="content">
          <Link to={`/${post.category}/${post.id}`} className="header">
            {capitalize(post.title)}
          </Link>
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
              <Link to={post.category}>{post.category}</Link>
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
      </div>
    </div>
  );
};
export default PostItem;
