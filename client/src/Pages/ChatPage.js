import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import ChatPanel from '../components/ChatPanel';
import Navbar from '../components/Navbar';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const socketRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // 從 Redux 獲取當前登入用戶的 ID
  const loggedInUserId = useSelector(state => state.user.userId);
  
  // 異步方法來創建或獲取聊天室和消息
  const fetchOrCreateChatAndFetchMessages = async (loggedInUserId, selectedUserId) => {
    try {
      const response = await axios.get(`/api/getOrCreateChatAndFetchMessages?loggedInUserId=${loggedInUserId}&selectedUserId=${selectedUserId}`);
      const { chatRoom, messages } = response.data;
      
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
  }, [loggedInUserId]); // 依賴於 loggedInUserId

  return (
    <div>
      <Navbar />
      <div className="chat-page">
        <div className="user-list">
          {users.map(user => (
            <UserCard key={user.userId} user={user} onClick={() => fetchOrCreateChatAndFetchMessages(loggedInUserId, user.userId)} />
          ))}
        </div>
        <div className="chat-panel">
          {selectedUserId && <ChatPanel messages={messages} socket={socketRef.current} loggedInUserId={loggedInUserId} selectedUserId={selectedUserId} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
