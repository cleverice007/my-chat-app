import React from 'react';
import axios from 'axios';

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
    
    // 這裡可以進一步處理，比如將 chatRoom 和 messages 送到 Redux store 或某個 state 管理系統。
    
  } catch (error) {
    console.error("Error fetching or creating chat room:", error);
  }
};

const UserCard = ({ username, profilePicture }) => (
  <div 
    className="user-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out" 
    onClick={() => {
      // 從 URL 中獲取當前登入用戶的 username。
      const loggedInUsername = window.location.pathname.split("/chat/")[1];
      
      // 觸發上面的 async 函數。
      fetchOrCreateChatRoom(loggedInUsername, username);
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

export default UserCard;

