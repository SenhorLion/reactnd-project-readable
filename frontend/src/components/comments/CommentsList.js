import React from 'react';
import Loading from 'react-loading';
import cuid from 'cuid';

import CommentFormControl from './CommentFormControl';
import CommentItem from './CommentItem';

const CommentsList = ({
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
  const isCommentsLoaded = !isFetching && items && Object.keys(items).length;
  const commentsCount = items && parseInt(items.length, 10);

  return (
    <div className="ui comments post-comment">
      <div className="post-comment__header">
        <h3 className={`post-comment__title`}>
          Comments <span className="ui label circular">{commentsCount}</span>
        </h3>
      </div>

      <div className="comment">
        {isFetching && (
          <Loading delay={200} type="spokes" color="#222" className="loading" />
        )}

        <div>
          {isCommentsLoaded ? (
            <div>
              {Object.values(items).map(item => (
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
              ))}
            </div>
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
      </div>
    </div>
  );
};

export default CommentsList;
