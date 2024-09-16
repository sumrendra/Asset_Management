const { assetContractInstance } = require('./web3Model');

async function getPastAssetEvents(eventName, filters) {
  const options = {
    filter: filters,
    fromBlock: 0,
    toBlock: 'latest'
  };
  
  return await assetContractInstance.getPastEvents(eventName, options);
}

module.exports = {
  getPastAssetEvents
};
