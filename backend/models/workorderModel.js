const { workorderContractInstance } = require('./web3Model');

async function getPastWorkorderEvents(eventName, filters) {
  const options = {
    filter: filters,
    fromBlock: 0,
    toBlock: 'latest'
  };
  
  return await workorderContractInstance.getPastEvents(eventName, options);
}

module.exports = {
  getPastWorkorderEvents
};
