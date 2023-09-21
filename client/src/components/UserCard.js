import React from 'react';

const UserCard = ({ username, profilePicture, onClick }) => (
  <div 
    className="user-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out" 
    onClick={onClick}
  >
    <img 
      className="w-full h-30 object-cover" 
      src={profilePicture} 
      alt={`${username}'s profile`} 
    />
    <div className="p-4">
      <h3 className="font-bold text-lg">{username}</h3>
    </div>
  </div>
);

export default UserCard;