import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MatchingCard from '../components/MatchingCard';

const MatchingPage = () => {
  const [potentialMatches, setPotentialMatches] = useState([]);

  // 從 Redux store 中取得 userId
  const loggedInUser = useSelector(state => state.user);
  const loggedInUserId = loggedInUser ? loggedInUser.userId : null;

  console.log("Current loggedInUserId in MatchingPage:", loggedInUserId); // Debug

  // 從伺服器取得潛在配對
  const fetchPotentialMatches = async () => {
    if (!loggedInUserId) {
      console.error('loggedInUserId is null. Cannot fetch potential matches.');
      return;
    }

    try {
      const response = await axios.get(`/api/potentialMatches?userId=${loggedInUserId}`);
      setPotentialMatches(response.data);
    } catch (error) {
      console.error('Error fetching potential matches:', error);
    }
  };

  useEffect(() => {
    if (loggedInUserId) {
      fetchPotentialMatches();
    }
  }, [loggedInUserId]); // 只有在 loggedInUserId 改變時才會觸發 useEffect
  return (
    <div className="w-full h-screen bg-gray-200">
      {potentialMatches.map((potentialMatch, index) => (
        <MatchingCard key={index} userProfile={potentialMatch} />
      ))}
    </div>
  );
};

export default MatchingPage;

