import React from 'react';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${month}-${day} ${hour}:${minute}`;
};

const Message = ({ content, from, timestamp }) => (
  <div className="message">
    <strong>{from}</strong>: {content} <span>({formatDate(timestamp)})</span>
  </div>
);

export default Message;

