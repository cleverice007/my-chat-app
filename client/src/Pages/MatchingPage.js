import React from 'react';
import MatchingCard from './MatchingCard';

const MatchingPage = () => {
  // 假設的個人資料
  const profile = {
    name: "Jane Doe",
    age: 27,
    location: "Taipei",
    image: "https://phantom-marca.unidadeditorial.es/89ca58c034bdd768cd36d800cb3e3a73/resize/1320/f/webp/assets/multimedia/imagenes/2023/07/04/16884982838657.jpg"  
  };

  return (
    <div className="w-full h-screen bg-gray-200">
      <MatchingCard profile={profile} />
    </div>
  );
};

export default MatchingPage;
