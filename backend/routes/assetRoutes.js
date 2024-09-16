const express = require('express');
const {
    getRegisteredAssets,
    getInitiatedOwnershipTransfers,
    getAcceptedOwnershipTransfers,
    getPastChangedTransferCondition
  } = require('../controllers/assetController');
const router = express.Router();

router.get('/registered', getRegisteredAssets);
router.get('/initiated-ownership-transfers', getInitiatedOwnershipTransfers);
router.get('/accepted-ownership-transfers', getAcceptedOwnershipTransfers);
router.get('/changed-transfer-conditions', getPastChangedTransferCondition);

module.exports = router;
