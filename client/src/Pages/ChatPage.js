import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; 
import UserCard from '../components/UserCard';
import ChatPanel from '../components/ChatPanel';
import Navbar from '../components/Navbar';
import io from 'socket.io-client';

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const socketRef = useRef(null);
    const [users, setUsers] = useState([]); 
    const messages = [
        // Fetch these from your state or server
    ];
    // || 'http://localhost:3000'
    useEffect(() => {
      socketRef.current = io(process.env.REACT_APP_WS_URL );
    
      socketRef.current.on('connect', () => {
        console.log('Socket.io connected');
      });
    
      socketRef.current.on('privateMessage', (message) => {
        console.log('Received private message:', message);
        // 在這裡更新你的 messages 狀態
      });

      axios.get('/userprofiles') 
      .then(response => {
        setUsers(response.data);
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
                  username={user.name}
                  profilePicture={user.profilePicture}
                  onClick={() => setSelectedUser(user.name)}
                  socket={socketRef.current}
                />
              ))}
            </div>
            <div className="chat-section w-3/4">
              {selectedUser && <ChatPanel messages={messages} socket={socketRef.current} />}
            </div>
          </div>
        </div>
      );
};

export default ChatPage;
