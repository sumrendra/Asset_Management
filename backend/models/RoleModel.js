const { ethers } = require('ethers');
const UserRolesArtifact = require('../../frontend/src/contracts/UserRoles.json');
const contractAddress = require('../../frontend/src/contracts/contract-address.json');
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const userRolesContract = new ethers.Contract(contractAddress.UserRoles, UserRolesArtifact.abi, provider);

const hasAdminRole = async (account) => {
  return await userRolesContract.hasRole(ethers.constants.HashZero, account);
};

module.exports = { hasAdminRole };
