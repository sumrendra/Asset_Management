const asset = require('../frontend/src/contracts/Asset.json');
const assetWorkorder = require('../frontend/src/contracts/AssetWorkorder.json');
const contractAddress = require('../frontend/src/contracts/contract-address.json');

// HTTP Provider
const httpProviderUrl = 'http://127.0.0.1:8545';

// WebSocket Provider
const wsProviderUrl = 'ws://127.0.0.1:8545';

// Contract ABI and addresses
const contracts = {
  Asset: {
    abi: asset.abi,
    contractAddress: contractAddress.Asset
  },
  AssetWorkorder: {
    abi: assetWorkorder.abi,
    contractAddress: contractAddress.AssetWorkorder
  }
};

module.exports = {
  httpProviderUrl,
  wsProviderUrl,
  contracts
};
