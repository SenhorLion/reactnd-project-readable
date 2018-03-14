import React from 'react';
import cuid from 'cuid';

import SortControl from '../sort/SortControl';
import PostItem from './PostItem';

/* 
// Posts properties:
{
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
} 
*/

const PostsList = ({ list, sortKey, isSortReverse, sortFilter }) => {
  const sortedList = sortFilter[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="posts-list">
      {reverseSortedList.map(post => <PostItem key={cuid()} post={post} />)}
    </div>
  );
};

export default PostsList;
