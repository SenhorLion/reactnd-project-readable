import React from 'react';
import Moment from 'react-moment';
import classNames from 'classnames';

const CommentItem = ({ comment, categoryColour }) => {
  const {
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted,
  } = comment;

  const userIconClass = classNames('user big icon', categoryColour);

  return (
    <div className="comment">
      <a className="avatar">
        <i className={userIconClass} />
      </a>
      <div className="content">
        <a className="author">{author}</a>
        <div className="metadata">
          <div className="date">
            <Moment fromNow>{timestamp}</Moment>
          </div>
        </div>
        <div className="text">
          <p>{body}</p>
        </div>
        {/* <div className="actions">
          <a className="reply">Reply</a>
        </div> */}
      </div>
    </div>
  );
};

export default CommentItem;
