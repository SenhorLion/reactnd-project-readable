import React from 'react';
import Button from '../button/Button';
import classNames from 'classnames';

const SortControl = ({
  sortKey,
  activeSortKey,
  isSortReverse,
  onSort,
  children,
}) => {
  const isActive = sortKey === activeSortKey;
  const sortClass = classNames('ui basic button sort-filter', {
    active: isActive,
  });
  const iconClass = classNames('caret icon', {
    up: isActive && isSortReverse,
    down: isActive && !isSortReverse,
  });
  return (
    <Button className={sortClass} onClick={() => onSort(sortKey)}>
      {isActive && <i className={iconClass} />}
      {children}{' '}
    </Button>
  );
};

export default SortControl;
