import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setTargetUsername, addMessage } from '../store/userSlice';



const Chat = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const targetUsername = useSelector((state) => state.user.targetUsername);
  const messages = useSelector((state) => state.user.messages);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data);
      dispatch(addMessage(newMessage));
    });

    return () => {
      ws.close();
    };
  }, [dispatch]);

  const sendMessage = () => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.addEventListener('open', () => {
      ws.send(
        JSON.stringify({
          type: 'message',
          from: username,
          to: targetUsername,
          content: 'Your message content here',
        })
      );
    });
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
      <textarea placeholder="Your message here"></textarea>
      <button onClick={sendMessage}>Send</button>
      <textarea readOnly value={messages.map((msg) => `${msg.from}: ${msg.content}`).join('\n')} />
    </div>
  );
};

export default Chat;

