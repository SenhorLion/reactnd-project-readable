import React from 'react';
import cuid from 'cuid';
import PostItem from './PostItem';

const PostList = ({
  list,
  sortKey,
  isSortReverse,
  sortFilter,
  openDeletePostModal,
  onDeletePost,
}) => {
  const sortedList = sortFilter[sortKey](Object.values(list));
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="posts-list">
      {reverseSortedList.map(post => (
        <PostItem
          key={cuid()}
          post={post}
          onDeletePost={onDeletePost}
          openDeletePostModal={openDeletePostModal}
        />
      ))}
    </div>
  );
};

export default PostList;
