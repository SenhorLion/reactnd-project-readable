import React from 'react';
import cuid from 'cuid';
import Loading from 'react-loading';
import SortControl from '../sort/SortControl';
import PostItem from './PostItem';

const PostsList = ({ list, sortKey, isSortReverse, sortFilter }) => {
  const sortedList = sortFilter[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  const isListLoaded = reverseSortedList.length;

  return (
    <div className="posts-list">
      {!isListLoaded && (
        <Loading delay={200} type="spokes" color="#222" className="loading" />
      )}
      {isListLoaded &&
        reverseSortedList.map(post => <PostItem key={cuid()} post={post} />)}
    </div>
  );
};

export default PostsList;
