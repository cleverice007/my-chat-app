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

  const loggedInUserId = useSelector(state => state.user.userId);

  const fetchOrCreateChatAndFetchMessages = async (loggedInUserId, selectedUserId) => {
    try {
      const response = await axios.get(`/api/getOrCreateChatAndFetchMessages?loggedInUserId=${loggedInUserId}&selectedUserId=${selectedUserId}`);
      const { chatRoom, messages } = response.data;

      console.log("Chat room info:", chatRoom);
      console.log("Messages:", messages);

      // 更新你的 messages 狀態（這裡假設你已經用 React 的 useState 定義了 setMessages）
      setMessages(messages);

    } catch (error) {
      console.error("Error fetching or creating chat room and messages:", error);
    }
  };


  // || 'http://localhost:3000'
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_WS_URL);

    socketRef.current.on('connect', () => {
      console.log('Socket.io connected');
    });

    socketRef.current.on('privateMessage', (message) => {
      console.log('Received private message:', message);
      // 在這裡更新你的 messages 狀態
    });

    axios.get('/api/userprofiles')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.userId !== loggedInUserId); // 過濾掉當前登入用戶
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.error('Error fetching user profiles:', error);
      });



    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
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
              setSelectedUserId(user.userId);
            }}
          />
          ))}
        </div>
        <div className="chat-section w-3/4">
          {selectedUserId && <ChatPanel messages={messages} socket={socketRef.current} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
