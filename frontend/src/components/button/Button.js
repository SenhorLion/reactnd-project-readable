import React from 'react';

const Button = ({ onClick, className = '', type = 'button', children }) => (
  <button onClick={onClick} className={className} type={type}>
    {' '}
    {children}{' '}
  </button>
);

export default Button;
