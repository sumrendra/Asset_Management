const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const checkAdmin = require('./middleware/adminMiddleware'); // REST API middleware
const verifyClient = require('./middleware/websocketAuthMiddleware'); // WebSocket middleware

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let roleRequests = [];

// Create HTTP server to integrate WebSocket
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// WebSocket server with authentication
const wss = new WebSocket.Server({ server, verifyClient });

wss.on('connection', ws => {
  console.log('WebSocket connection established');

  // Send current role requests to the newly connected client
  ws.send(JSON.stringify({ requests: roleRequests }));

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// REST API route to get role requests (protected by admin check middleware)
app.get('/role-requests', checkAdmin, (req, res) => {
  console.log("Fetching role requests...");
  res.json({ requests: roleRequests });
});

// REST API route to handle role request submission
app.post('/request-role', (req, res) => {
  const { account, role } = req.body;
  console.log(`Role request from ${account} for role ${role}`);
  roleRequests.push({ account, role });

  // Notify all WebSocket clients about the new role request
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ requests: roleRequests }));
    }
  });

  res.json({ success: true, message: 'Role request submitted.' });
});
