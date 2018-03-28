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
  const sortClass = classNames('item sort-filter', {
    active: isActive,
  });
  const iconClass = classNames('caret icon', {
    up: isActive && isSortReverse,
    down: isActive && !isSortReverse,
  });
  return (
    <a className={sortClass} onClick={() => onSort(sortKey)}>
      {isActive && <i className={iconClass} />}
      {children}{' '}
    </a>
  );
};

export default SortControl;

{
  /* <div class="ui celled horizontal list">
  <div class="item">About Us</div>
  <div class="item">Contact</div>
  <div class="item">Support</div>
</div>; */
}
