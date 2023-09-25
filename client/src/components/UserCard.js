import React from 'react';
import { useSelector } from 'react-redux'; 

const UserCard = ({ userId, username, profilePicture, onClick }) => {
  return (
    <div 
      className="user-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out" 
      onClick={onClick}
    >
      <img 
        className="w-20 h-20 object-cover" 
        src={profilePicture} 
        alt={`${username}'s profile`} 
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{username}</h3>
      </div>
    </div>
  );
};


export default UserCard;


