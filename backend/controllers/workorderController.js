const { getPastWorkorderEvents } = require('../models/workorderModel');

async function getCreatedWorkOrders(req, res) {
  const { tokenId } = req.query;
  
  try {
    const filters = {};
    if (tokenId) filters.tokenId = tokenId;

    const events = await getPastWorkorderEvents('WorkOrderCreated', filters);
    const formattedEvents = events.map(event => ({
      tokenId: event.returnValues.tokenId.toString(),
      index: event.returnValues.index.toString(),
      details: event.returnValues.details
    }));

    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
}

async function getUpdatedWorkOrders(req, res) {
  const { tokenId } = req.query;
  
  try {
    const filters = {};
    if (tokenId) filters.tokenId = tokenId;

    const events = await getPastWorkorderEvents('WorkOrderUpdated', filters);
    const formattedEvents = events.map(event => ({
      tokenId: event.returnValues.tokenId.toString(),
      index: event.returnValues.index.toString(),
      newDetails: event.returnValues.newDetails,
      isCompleted: event.returnValues.isCompleted
    }));

    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
}

module.exports = {
  getCreatedWorkOrders,
  getUpdatedWorkOrders
};
