import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const [users, setUsers] = useState([]);
  // 從 Redux 獲取當前登入用戶
  const loggedInUser = useSelector(state => state.user);
  const loggedInUserId = loggedInUser.userId;

const MatchingCard = ({ profile }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <img src={profile.image} alt="Profile" className="absolute z-10 w-3/4 h-4/5 object-cover rounded-lg shadow-lg" />
      <div className="absolute z-20 bottom-4 left-4 text-white">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-lg">{profile.age} years</p>
        <p className="text-lg">{profile.location}</p>
      </div>
    </div>
  );
};

export default MatchingCard;
