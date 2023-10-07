import React from 'react';

const MatchingCard = ({ userProfile }) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <img src={userProfile.profilePicture} alt="Profile Picture" className="absolute z-10 w-3/4 h-4/5 object-cover rounded-lg shadow-lg" />
      <div className="absolute z-20 bottom-4 left-4 text-white">
        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
        <p className="text-lg">{userProfile.age} years</p>
        <p className="text-lg">{userProfile.location}</p>
        <p className="text-lg">{userProfile.gender}</p>
        <p className="text-lg">{userProfile.aboutMe}</p>
        <p className="text-lg">{userProfile.interests}</p>
      </div>
    </div>
  );
};

export default MatchingCard;
