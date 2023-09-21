import React from 'react';
import Message from './Message';

const ChatPanel = ({ messages, socket }) => {
  const sendMessage = (content) => {
    socket.emit('privateMessage', {
      to: 'someTargetUsername',  // 將這個值替換成實際的目標使用者名稱
      message: content,
    });
  };

  return (
    <div className="chat-panel">
      {messages.map((msg, index) => (
        <Message key={index} content={msg.content} from={msg.from} />
      ))}
      <button onClick={() => sendMessage('Hello, world!')}>Send Message</button>
    </div>
  );
};

export default ChatPanel;

