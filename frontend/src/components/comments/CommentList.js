import React from 'react';
import Loading from 'react-loading';
import cuid from 'cuid';

import { pluralize } from '../../utils/helper';
import CommentFormControl from './CommentFormControl';
import CommentItem from './CommentItem';

const CommentList = ({
  postId,
  comments,
  categoryColour,
  fetchAllComments,
  fetchAllPosts,
  onAddComment,
  onEditComment,
  onDeleteComment,
  openDeleteCommentModal,
}) => {
  const { isFetching, items } = comments;
  const isCommentsLoaded = !!(!isFetching && Object.keys(items).length);
  const commentsCount = items && parseInt(items.length, 10);

  return (
    <div className="ui comments">
      {isCommentsLoaded && (
        <div className="post-comment__header">
          <h3 className={`ui dividing header post-comment__title`}>
            <span
              className={`post-comment__count ui label circular ${categoryColour}`}
            >
              {commentsCount}
            </span>{' '}
            {pluralize('Comment', commentsCount)}
          </h3>
        </div>
      )}
      {isFetching && (
        <Loading delay={200} type="spokes" color="#222" className="loading" />
      )}
      {isCommentsLoaded ? (
        Object.values(items).map(item => (
          <CommentItem
            key={cuid()}
            comment={item}
            categoryColour={categoryColour}
            onDeleteComment={onDeleteComment}
            fetchAllComments={fetchAllComments}
            fetchAllPosts={fetchAllPosts}
            onEditComment={onEditComment}
            openDeleteCommentModal={openDeleteCommentModal}
          />
        ))
      ) : (
        <div className={`ui icon message ${categoryColour}`}>
          <i className="exclamation icon" />
          <div className="content">
            <div className="header">No comments yet</div>
            <p>Why not get the party started??</p>
          </div>
        </div>
      )}
      <CommentFormControl
        postId={postId}
        fetchAllPosts={fetchAllPosts}
        fetchAllComments={fetchAllComments}
        onAddComment={onAddComment}
        categoryColour={categoryColour}
      />
    </div>
  );
};

export default CommentList;
