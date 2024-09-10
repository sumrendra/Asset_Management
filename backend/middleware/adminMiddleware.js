const { ethers } = require('ethers');
const UserRolesArtifact = require('../../frontend/src/contracts/UserRoles.json');
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // Verify this URL
const contractAddress = require('../../frontend/src/contracts/contract-address.json');
const contractABI = UserRolesArtifact.abi;
const userRolesContract = new ethers.Contract(contractAddress.UserRoles, contractABI, provider);
const checkAdmin = async (req, res, next) => {
  try {
    
    const account = req.headers['account'];
    if (!account) {
      return res.status(400).json({ message: 'Account address is required' });
    }

    // Check if account is admin
    const isAdmin = await userRolesContract.hasRole(ethers.constants.HashZero, account);
    if (isAdmin) {
      next(); // Continue to the route handler
    } else {
      res.status(403).json({ message: 'Forbidden: Not an admin' });
    }
  } catch (error) {
    console.error('Error in checkAdmin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = checkAdmin;
