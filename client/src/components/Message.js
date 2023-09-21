import React from 'react';

const Message = ({ content, from }) => (
  <div className="message">
    <strong>{from}</strong>: {content}
  </div>
);

export default Message;
