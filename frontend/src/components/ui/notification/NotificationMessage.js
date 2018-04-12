import React from 'react';
import { capitalize } from '../../../utils/helper';

const NotificationMessage = ({ message, category, categoryColour }) => {
  const messageToShow = `${message} ${
    category ? `for ${capitalize(category)}` : ''
  }`;

  return (
    <div
      className={`ui icon center aligned message ${
        categoryColour ? categoryColour : ''
      }`}
    >
      <i className="exclamation icon" />
      <div className="content">
        <div className="header">{messageToShow}</div>
      </div>
    </div>
  );
};

export default NotificationMessage;
