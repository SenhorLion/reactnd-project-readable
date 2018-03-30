import React from 'react';
import Moment from 'react-moment';
import classNames from 'classnames';

// CommentItem data
// '894tuq4ut84ut8v4t8wun89g': {
//     id: '894tuq4ut84ut8v4t8wun89g',
//     parentId: '8xf0y6ziyjabvozdd253nd',
//     timestamp: 1468166872634,
//     body: 'Hi there! I am a COMMENT.',
//     author: 'thingtwo',
//     voteScore: 6,
//     deleted: false,
//     parentDeleted: false,
//   },

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

  console.log('##### comment', comment);

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
