const express = require('express');
const http = require('http');
const WebSocket = require('ws');


const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
let users = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    let parsedMessage = JSON.parse(message);

    // 如果是第一次連接，根據"from"字段設置用戶名
    if (parsedMessage.from && !ws.username) {
      ws.username = parsedMessage.from;
      users[ws.username] = ws;
    }

    switch (parsedMessage.type) {
      case 'message':
        const targetWs = users[parsedMessage.to];
        if (targetWs && targetWs.readyState === WebSocket.OPEN) {
          targetWs.send(
            JSON.stringify({
              type: 'message',
              from: parsedMessage.from,
              content: parsedMessage.content,
            })
          );
        } else {
          console.log("Target WebSocket is not available.");
        }
        break;
    }
  });
});


const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});