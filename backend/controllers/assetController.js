const { getPastAssetEvents } = require('../models/assetModel');

async function getRegisteredAssets(req, res) {
  const { tokenId, owner } = req.query;
  
  try {
    const filters = {};
    if (tokenId) filters.tokenId = tokenId;
    if (owner) filters.owner = owner;
    
    const events = await getPastAssetEvents('AssetRegistered', filters);
    const formattedEvents = events.map(event => ({
      tokenId: event.returnValues.tokenId.toString(),
      owner: event.returnValues.owner,
      details: event.returnValues.details,
      transferCondition: event.returnValues.transferCondition
    }));
    
    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
}

async function getInitiatedOwnershipTransfers(req, res) {
  const { tokenId, owner, newOwner } = req.query;
  
  try {
    const filters = {};
    if (tokenId) filters.tokenId = tokenId;
    if (owner) filters.owner = owner;
    if (newOwner) filters.newOwner = newOwner;
    
    const events = await getPastAssetEvents('OwnershipTransferredInitiated', filters);
    const formattedEvents = events.map(event => ({
      tokenId: event.returnValues.tokenId.toString(),
      owner: event.returnValues.owner,
      newOwner: event.returnValues.newOwner      
    }));
    
    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
}

async function getAcceptedOwnershipTransfers(req, res) {
  const { tokenId, newOwner } = req.query;
  
  try {
    const filters = {};
    if (tokenId) filters.tokenId = tokenId;
    if (newOwner) filters.newOwner = newOwner;
    
    const events = await getPastAssetEvents('OwnershipTransferredAccepted', filters);
    const formattedEvents = events.map(event => ({
      tokenId: event.returnValues.tokenId.toString(),
      newOwner: event.returnValues.newOwner      
    }));
    
    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
}

async function getPastChangedTransferCondition(req, res) {
  const { tokenId, previousCondition, condition } = req.query;
  
  try {
    const filters = {};
    if (tokenId) filters.tokenId = tokenId;
    if (previousCondition) filters.previousCondition = previousCondition;
    if (condition) filters.condition = condition;
    
    const events = await getPastAssetEvents('TransferConditionSet', filters);
    const formattedEvents = events.map(event => ({
      tokenId: event.returnValues.tokenId.toString(),
      previousCondition: event.returnValues.previousCondition,
      condition: event.returnValues.condition
    }));
    
    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
}


module.exports = {
  getRegisteredAssets,
  getInitiatedOwnershipTransfers,
  getAcceptedOwnershipTransfers,
  getPastChangedTransferCondition
};
