const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cors = require('cors');

const app = express();
app.use(cors());

let users = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    let parsedMessage = JSON.parse(message);

    switch (parsedMessage.type) {
      case 'login':
        users[parsedMessage.username] = ws;
        ws.username = parsedMessage.username;
        break;
      case 'message':
        const targetWs = users[parsedMessage.target];
        targetWs.send(JSON.stringify({ type: 'message', content: parsedMessage.content }));
        break;
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});