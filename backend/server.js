const app = require('./app');

// Starting the HTTP server
const server = app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

// WebSocket setup
const WebSocket = require('ws');
const { handleConnection } = require('./controllers/roleController'); // WebSocket connection handler
const verifyClient = require('./middleware/websocketAuthMiddleware'); // WebSocket auth middleware

// Creating WebSocket server and attaching it to the HTTP server
const wss = new WebSocket.Server({ server, verifyClient });

// WebSocket connection event handler
wss.on('connection', handleConnection);
