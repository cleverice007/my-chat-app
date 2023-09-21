import React, { useState } from 'react';
import UserCard from '../components/UserCard';
import ChatPanel from '../components/ChatPanel';
import Navbar from '../components/Navbar';


const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const users = [
        { username: 'Alice', profilePicture: '/path/to/alice.jpg' },
        // ...
    ];
    const messages = [
        // Fetch these from your state or server
    ];
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
                />
              ))}
            </div>
            <div className="chat-section w-3/4">
              {selectedUser && <ChatPanel messages={messages} />}
            </div>
          </div>
        </div>
      );
      
};

export default ChatPage;
