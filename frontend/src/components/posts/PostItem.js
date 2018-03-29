import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import classNames from 'classnames';

import { capitalize, getCategoryColour } from '../../utils/helper';
import Button from '../button/Button';

const PostItem = ({ post, openDeletePostModal /*onDeletePost*/ }) => {
  const categoryColour = getCategoryColour(post.category);
  const postItemClass = classNames(
    'ui  segment divided items post',
    categoryColour
  );
  const uiLabelColour = classNames('ui label', categoryColour);

  return (
    <div className={postItemClass}>
      <div className="item">
        <div className="content">
          <Link to={`/${post.category}/${post.id}`} className="header">
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
              <i className="like icon" /> {post.voteScore}
            </div>
            <div className={uiLabelColour}>
              <Link to={`/${post.category}/${post.id}`}>
                <i className="comment alternate outline icon" />{' '}
                {post.commentCount}
              </Link>
            </div>

            <div className="post-actions right floated">
              <Button
                onClick={() => openDeletePostModal(post.id)}
                className="ui mini right floated button"
              >
                <i className="trash icon" /> Delete post
              </Button>

              <Link
                to={`/${post.category}/${post.id}/edit`}
                className="ui mini right floated button button__link"
              >
                <i className="edit icon" /> Edit post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// onDeletePost

// const mapStateToProps = ({ categories, posts }) => ({
//   categories,
//   posts,
// });

// this.props.dispatch(toggleTodo(id));

export default PostItem;
