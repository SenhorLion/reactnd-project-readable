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
  const isListLoaded = reverseSortedList.length;

  return (
    <div className="posts-list">
      {!isListLoaded && (
        <Loading delay={200} type="spokes" color="#222" className="loading" />
      )}
      {isListLoaded &&
        reverseSortedList.map(post => (
          <PostItem key={cuid()} post={post} onDeletePost={onDeletePost} />
        ))}
    </div>
  );
};

export default PostsList;
