let roleRequests = [];

function handleConnection(ws) {
  console.log('WebSocket connection established');
  
  ws.send(JSON.stringify({ requests: roleRequests }));

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
}

function submitRoleRequest(req, res) {
  const { account, role } = req.body;
  roleRequests.push({ account, role });

  res.json({ success: true, message: 'Role request submitted.' });
}

function getRoleRequests(req, res) {
  res.json({ requests: roleRequests });
}

module.exports = {
  handleConnection,
  submitRoleRequest,
  getRoleRequests
};
