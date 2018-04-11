import React from 'react';
import classNames from 'classnames';

const SortControl = ({
  sortKey,
  activeSortKey,
  isSortReverse,
  onSort,
  children,
}) => {
  const isActive = sortKey === activeSortKey;
  const sortClass = classNames('item sort-filter', {
    active: isActive,
  });
  const iconClass = classNames('caret icon', {
    up: isActive && isSortReverse,
    down: isActive && !isSortReverse,
  });
  return (
    <a className={sortClass} onClick={() => onSort(sortKey)}>
      {children} {isActive && <i className={iconClass} />}
    </a>
  );
};

export default SortControl;
