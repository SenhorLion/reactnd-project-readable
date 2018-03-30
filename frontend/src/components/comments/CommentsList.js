import React from 'react';
import Loading from 'react-loading';
import cuid from 'cuid';

import PostCommentFormControl from '../posts/PostCommentFormControl';
import CommentItem from './CommentItem';

const CommentsList = ({
  postId,
  comments,
  categoryColour,
  fetchAllComments,
  onAddComment,
}) => {
  const { isFetching, items } = comments;
  const isCommentsLoaded = !isFetching && items && items.length;

  return (
    <div className="ui comments post-comment">
      <div className="post-comment__header">
        <h3 className="post-comment__title">Comments</h3>
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

          <PostCommentFormControl
            postId={postId}
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
