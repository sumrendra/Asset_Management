const { Web3 } = require('web3');
const { contracts, httpProviderUrl, } = require('../config');

const web3 = new Web3(new Web3.providers.HttpProvider(httpProviderUrl));

const assetContractInstance = new web3.eth.Contract(contracts.Asset.abi, contracts.Asset.contractAddress);
const workorderContractInstance = new web3.eth.Contract(contracts.AssetWorkorder.abi, contracts.AssetWorkorder.contractAddress);

module.exports = {
  assetContractInstance,
  workorderContractInstance
};
