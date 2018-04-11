import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';

import { capitalize, getCategoryColour } from '../../utils/helper';
import Button from '../ui/button/Button';
import ReactionPosts from '../ui/reaction/ReactionPosts';

const PostItem = ({ post, openDeletePostModal }) => {
  const categoryColour = getCategoryColour(post.category);
  const postItemClass = classNames(
    'ui segment divided items post',
    categoryColour
  );
  const postItemHeaderClass = classNames('ui header', categoryColour);
  const uiLabelColour = classNames('ui label', categoryColour);

  return (
    <div className={postItemClass}>
      <div className="item">
        <div className="content">
          <Link
            to={`/${post.category}/${post.id}`}
            className={postItemHeaderClass}
          >
            {capitalize(post.title)}
          </Link>
          <div className="meta">
            <span className="author">By {post.author}</span>
            <span className="date">
              <Moment fromNow>{post.timestamp}</Moment>
            </span>
          </div>

          <div className="description">
            <p>{post.body}</p>
          </div>

          <div className="extra">
            <div className={uiLabelColour}>
              <Link to={post.category}>{post.category}</Link>
            </div>

            <div className={uiLabelColour}>
              <Link to={`/${post.category}/${post.id}`}>
                <i className="comment alternate icon" /> {post.commentCount}
              </Link>
            </div>

            <ReactionPosts
              categoryColour={categoryColour}
              itemId={post.id}
              classNameProp="ui label"
            />

            <Button
              onClick={() => openDeletePostModal(post.id)}
              className="ui label right floated"
            >
              <i className="trash icon" /> Delete
            </Button>

            <Link
              to={`/${post.category}/${post.id}/edit`}
              className="ui label right floated"
            >
              <i className="edit icon" /> Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
