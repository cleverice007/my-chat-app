import React, { useEffect, useState, useRef } from 'react';
import UserCard from '../components/UserCard';
import ChatPanel from '../components/ChatPanel';
import Navbar from '../components/Navbar';
import io from 'socket.io-client';

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const socketRef = useRef(null);
    const users = [
        { username: 'Alice', profilePicture: '/path/to/alice.jpg' },
        // ...
    ];
    const messages = [
        // Fetch these from your state or server
    ];

    useEffect(() => {
      socketRef.current = io(process.env.REACT_APP_WS_URL || 'http://localhost:3000');

      socketRef.current.on('connect', () => {
        console.log('Socket.io connected');
      });

      // Add more socket event listeners as needed

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
                  username={user.username}
                  profilePicture={user.profilePicture}
                  onClick={() => setSelectedUser(user.username)}
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
