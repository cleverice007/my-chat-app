import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setTargetUsername, addMessage } from '../store/userSlice';



const Chat = () => {
  const ws = useRef(null);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const targetUsername = useSelector((state) => state.user.targetUsername);
  const messages = useSelector((state) => state.user.messages);
  const [messageContent, setMessageContent] = useState('');


  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onerror = (event) => {
      console.log("WebSocket Error:", event);
      if (event instanceof ErrorEvent) {
        console.log(`Error Message: ${event.message}`);
      } else {
        console.log("Not an ErrorEvent");
      }
    };
    
    ws.current.addEventListener('message', (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        dispatch(addMessage(newMessage));
      } catch (e) {
        console.error('Failed to parse the received message as JSON:', event.data);
      }
    });

    return () => {
      ws.current.close();
    };
  }, [dispatch]);


  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: 'message',
          from: username,
          to: targetUsername,
          content: messageContent,
        })
      );
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Your username"
        onChange={(e) => dispatch(setUsername(e.target.value))}
      />
      <input
        type="text"
        placeholder="Target username"
        onChange={(e) => dispatch(setTargetUsername(e.target.value))}
      />
      <textarea
        placeholder="Your message here"
        onChange={(e) => setMessageContent(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
      <textarea readOnly value={messages.map((msg) => `${msg.from}: ${msg.content}`).join('\n')} />
    </div>
  );
};

export default Chat;

