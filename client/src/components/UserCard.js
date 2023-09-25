import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; 

const fetchOrCreateChatRoom = async (loggedInUsername, cardUsername) => {
  try {
    // 這裡的 API 請求應該返回一個聊天室的資訊，包括聊天室的 ID 和聊天室中的訊息。
    const response = await axios.post('/api/chatroom', {
      user1: loggedInUsername,
      user2: cardUsername,
    });

    const { chatRoom, messages } = response.data;
    console.log("Chat room info:", chatRoom);
    console.log("Messages:", messages);
    
    
  } catch (error) {
    console.error("Error fetching or creating chat room:", error);
  }
};

const UserCard = ({ username, profilePicture }) => {
  const loggedInUsername = useSelector(state => state.user.name); // 使用 useSelector 從 Redux 獲取 name
  return (
    <div 
      className="user-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out" 
      onClick={() => {
        fetchOrCreateChatRoom(loggedInUsername, username); // 使用從 Redux 獲得的 loggedInUsername
      }}
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

