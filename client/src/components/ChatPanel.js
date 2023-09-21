import React from 'react';
import Message from './Message';

const ChatPanel = ({ messages }) => (
  <div className="chat-panel">
    {messages.map((msg, index) => (
      <Message key={index} content={msg.content} from={msg.from} />
    ))}
  </div>
);

export default ChatPanel;
