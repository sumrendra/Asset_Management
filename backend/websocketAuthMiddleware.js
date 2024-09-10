const { ethers } = require('ethers');
const UserRolesArtifact = require('../../frontend/src/contracts/UserRoles.json');
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // Verify this URL
const contractAddress = require('../../frontend/src/contracts/contract-address.json');
const contractABI = UserRolesArtifact.abi;
const userRolesContract = new ethers.Contract(contractAddress.UserRoles, contractABI, provider);

async function verifyClient(info, callback) {
  try {
    // Extract account address from query parameters
    const account = new URLSearchParams(info.req.url.split('?')[1]).get('account');
    
    if (!account) {
      callback(false, 400, 'Unauthorized: No account provided');
      return;
    }

    // Check if account is admin
    const isAdmin = await userRolesContract.hasRole(ethers.constants.HashZero, account);

    if (isAdmin) {
      callback(true); // Allow WebSocket connection
    } else {
      callback(false, 403, 'Forbidden: Not an admin');
    }
  } catch (error) {
    console.error('Error in WebSocket auth middleware:', error);
    callback(false, 500, 'Internal server error');
  }
}

module.exports = verifyClient;
