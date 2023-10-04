import React from 'react';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${month}-${day} ${hour}:${minute}`;
};



const Message = ({ content, from, createdAt, loggedInUser, selectedUser }) => {
  const isCurrentUser = loggedInUser.userId === from;

  // 根據 isCurrentUser 的值來選擇使用哪個 profilePicture
  const profilePicture = isCurrentUser ? loggedInUser.profilePicture : selectedUser.profilePicture;

  return (
    <div className={`flex items-center ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <img src={profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
      <div className={`ml-2 rounded-lg p-2 ${isCurrentUser ? 'bg-green-200' : 'bg-gray-200'}`}>
        <strong>{from}</strong>: {content} <span className="text-sm text-gray-600">({formatDate(createdAt)})</span>
      </div>
    </div>
  );
};
export default Message;

