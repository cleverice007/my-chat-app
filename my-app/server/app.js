const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  ws.send('Hello! I am a WebSocket server.');
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
