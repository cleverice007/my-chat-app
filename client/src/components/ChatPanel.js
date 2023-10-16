import React, { useState, useEffect } from 'react'; // 新增 useState
import Message from './Message';

const ChatPanel = ({ messages, socket, loggedInUser, selectedUser }) => {
  const [localMessages, setLocalMessages] = useState(messages);
  const [messageInput, setMessageInput] = useState(''); // 新增 state 管理 textarea
  const loggedInUserId = loggedInUser.userId;

  const sendMessage = (content) => {
    const timestamp = new Date().getTime();
    const newMessage = {
      from: loggedInUserId,
      to: selectedUser.userId,
      message: content,
      createdAt: timestamp, 
        };
    socket?.emit('privateMessage', newMessage);
    setLocalMessages([...localMessages, newMessage]);
  };


  const handleTextareaChange = (e) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    setLocalMessages(messages);

    if (!socket) {
      console.warn("Socket 未初始化");
      return;
    }

    // Receive messages
  socket?.on('privateMessage', (message) => {
    console.log("接收到的私人訊息:", message);
    setLocalMessages(prevMessages => [...prevMessages, message]);
  });
    // Cleanup
    return () => {
      socket.off('privateMessage');
    };
  }, [socket, messages]);

  return (
    <div className="chat-panel">
      <div className="messages-section overflow-auto h-64 bg-gray-100 p-4">
        {localMessages.map((msg, index) => (
          <Message key={index} content={msg.content} from={msg.from}  createdAt={msg.createdAt}
          loggedInUser = {loggedInUser} selectedUser ={selectedUser} />
        ))}
      </div>
      <div className="input-section bg-gray-200 p-4 flex items-center">
        <textarea
          value={messageInput}
          onChange={handleTextareaChange}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        ></textarea>
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => sendMessage(messageInput)}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};



export default ChatPanel;

