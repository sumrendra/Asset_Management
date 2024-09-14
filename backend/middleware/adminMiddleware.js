const RoleModel = require('../models/RoleModel');

const checkAdmin = async (req, res, next) => {
  const account = req.headers['account'];
  if (!account) {
    return res.status(400).json({ error: 'Account address is required' });
  }

  try {
    const isAdmin = await RoleModel.hasAdminRole(account);
    
    if (!isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    next(); // Continue if the user is an admin
  } catch (error) {
    console.error('Error in admin check middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = checkAdmin;
