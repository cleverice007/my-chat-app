import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import ChatPanel from '../components/ChatPanel';
import Navbar from '../components/Navbar';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const socketRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // 從 Redux 獲取當前登入用戶
  const loggedInUser = useSelector(state => state.user);
  const loggedInUserId = loggedInUser.userId;
  
  // 異步方法來創建或獲取聊天室和消息
  const fetchOrCreateChatAndFetchMessages = async (loggedInUserId, selectedUserId) => {
    try {
      const response = await axios.get(`/api/getOrCreateChatAndFetchMessages?loggedInUserId=${loggedInUserId}&selectedUserId=${selectedUserId}`);
      const { chatRoom, messages } = response.data;
      console.log("Fetched messages from API:", messages); 
      // 更新 messages 狀態
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching or creating chat room and messages:", error);
    }
  };
  
  // 使用 useEffect 進行初始化
  useEffect(() => {
    if (loggedInUserId) {
      console.log("Current loggedInUserId:", loggedInUserId);
      
      // 建立 socket 連接
      socketRef.current = io(process.env.REACT_APP_WS_URL);
      
      // 監聽 connect 事件
      socketRef.current.on('connect', () => {
        console.log('Socket.io connected');
        
        // 發送 init 事件，並將 loggedInUserId 作為 username
        socketRef.current.emit('init', loggedInUserId);
      });
      
      // 從後端獲取所有用戶資料
      axios.get('/api/userprofiles')
        .then(response => {
          const filteredUsers = response.data.filter(user => user.userId !== loggedInUserId);
          setUsers(filteredUsers);
        })
        .catch(error => {
          console.error('Error fetching user profiles:', error);
        });
    }
    
    // 清理操作
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []); 

  return (
    <div>
      <div className="chat-page flex flex-col">
        <div className="upper-section mb-10">
          <Navbar />
        </div>
        <div className="lower-section flex">
          <div className="user-list w-1/4">
            {users.map((user, index) => (
              <UserCard
                key={index}
                userId={user.userId}
                username={user.name}
                profilePicture={user.profilePicture}
                onClick={() => {
                  fetchOrCreateChatAndFetchMessages(loggedInUserId, user.userId);
                  setSelectedUser(user);
                }}
              />
            ))}
          </div>
          <div className="chat-section w-3/4">
          {selectedUser && <ChatPanel messages={messages} socket={socketRef.current} loggedInUser={loggedInUser} selectedUser={selectedUser} />}          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ChatPage;
