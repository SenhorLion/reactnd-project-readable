import React from 'react';
import SortControl from './SortControl';

const SortByControls = ({ sortKey, isSortReverse, onSort }) => (
  <div className="page-header__sort-controls">
    <div className="controls-label ">Sort by:</div>
    <SortControl
      sortKey={'TITLE'}
      activeSortKey={sortKey}
      isSortReverse={isSortReverse}
      onSort={onSort}
    >
      Title
    </SortControl>

    <SortControl
      sortKey={'CATEGORY'}
      activeSortKey={sortKey}
      isSortReverse={isSortReverse}
      onSort={onSort}
    >
      Category
    </SortControl>

    <SortControl
      sortKey={'VOTE_SCORE'}
      activeSortKey={sortKey}
      isSortReverse={isSortReverse}
      onSort={onSort}
    >
      Vote
    </SortControl>

    <SortControl
      sortKey={'TIME_STAMP'}
      activeSortKey={sortKey}
      isSortReverse={isSortReverse}
      onSort={onSort}
    >
      Date
    </SortControl>
  </div>
);

export default SortByControls;
