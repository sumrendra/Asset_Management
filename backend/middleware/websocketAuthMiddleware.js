const RoleModel = require('../models/RoleModel');
const url = require('url');

// Middleware to verify WebSocket client
const verifyClient = (info, done) => {
  const query = url.parse(info.req.url, true).query;
  const { account } = query;

  if (!account) {
    return done(false, 401, 'Account address is required');
  }

  RoleModel.hasAdminRole(account)
    .then(isAdmin => {
      if (isAdmin) {
        return done(true); // Allow connection
      } else {
        return done(false, 403, 'Access denied. Admins only.');
      }
    })
    .catch(error => {
      console.error('Error in WebSocket authentication middleware:', error);
      return done(false, 500, 'Internal server error');
    });
};

module.exports = verifyClient;
