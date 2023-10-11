import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MatchingCard from '../components/MatchingCard';

const MatchingPage = () => {
  const [potentialMatches, setPotentialMatches] = useState([]);  
  
  // 從 Redux store 中取得 userId
  const loggedInUser = useSelector(state => state.user);
  const loggedInUserId = loggedInUser.userId;

  // 從伺服器取得潛在配對
  const fetchPotentialMatches = async () => {
    try {
      const response = await axios.get(`/api/potentialMatches?userId=${loggedInUserId}`);
      setPotentialMatches(response.data);
    } catch (error) {
      console.error('Error fetching potential matches:', error);
    }
  };
  
  useEffect(() => {
    fetchPotentialMatches();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200">
      {
        users.map((user, index) => (
          <MatchingCard key={index} userProfile={potentialMatches} />
        ))
      }
    </div>
  );
};

export default MatchingPage;
