import React from 'react';
import { capitalize } from '../../../utils/helper';

const NotificationMessage = ({ message, category, categoryColour }) => {
  const messageToShow = `${message} ${
    category ? `for ${capitalize(category)}` : ''
  }`;

  return (
    <div
      className={`ui info center aligned header message ${
        categoryColour ? categoryColour : ''
      }`}
    >
      <div className="header">
        <i className="exclamation icon" />
        {messageToShow}
      </div>
    </div>
  );
};

export default NotificationMessage;
