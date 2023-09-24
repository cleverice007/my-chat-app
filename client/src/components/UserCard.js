import React from 'react';

const UserCard = ({ name, profilePicture, onClick }) => (
  <div 
    className="user-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out" 
    onClick={onClick}
  >
    <img 
      className="w-20 h-20 object-cover" 
      src={profilePicture} 
      alt={`${name}'s profile`} 
    />
    <div className="p-4">
      <h3 className="font-bold text-lg">{name}</h3>
    </div>
  </div>
);

export default UserCard;
