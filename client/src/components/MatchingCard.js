import React from 'react';
import axios from 'axios'; 
const MatchingCard = ({ userProfile }) => {
  
  const handleMatch = () => {
    // 發送API請求進行配對
    axios.post('/api/match', { userId: userProfile.userId })
      .then(response => {
        console.log('Matched:', response.data);
      })
      .catch(error => {
        console.error('Error matching:', error);
      });
  };
  
  const handleUnmatch = () => {
    // 發送API請求取消配對
    axios.post('/api/unmatch', { userId: userProfile.userId })
      .then(response => {
        console.log('Unmatched:', response.data);
      })
      .catch(error => {
        console.error('Error unmatching:', error);
      });
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <img src={userProfile.profilePicture} alt="Profile Picture" className="absolute z-10 w-3/4 h-4/5 object-contain rounded-lg shadow-lg" />
      <div className="absolute z-20 bottom-4 left-4 text-white">
        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
        <p className="text-lg">{userProfile.age} years</p>
      </div>
      <div className="absolute z-20 bottom-4 right-4 text-white">
        <p className="text-lg">{userProfile.location}</p>
        <p className="text-lg">{userProfile.aboutMe}</p>
        <p className="text-lg">{userProfile.interests}</p>
      </div>
      <div className="absolute z-20 bottom-4 flex space-x-4">
        <button onClick={handleMatch} className="bg-green-500 p-4 rounded-full">
          ❤️
        </button>
        <button onClick={handleUnmatch} className="bg-red-500 p-4 rounded-full">
          ❌
        </button>
      </div>
    </div>
  );
};

export default MatchingCard;
