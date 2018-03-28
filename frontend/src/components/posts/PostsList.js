import React from 'react';
import cuid from 'cuid';
import Loading from 'react-loading';
import PostItem from './PostItem';

const PostsList = ({
  list,
  sortKey,
  isSortReverse,
  sortFilter,
  onDeletePost,
}) => {
  const sortedList = sortFilter[sortKey](Object.values(list));
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="posts-list">
      {reverseSortedList.map(post => (
        <PostItem key={cuid()} post={post} onDeletePost={onDeletePost} />
      ))}
    </div>
  );
};

export default PostsList;
