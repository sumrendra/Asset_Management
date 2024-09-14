const express = require('express');
const { getCreatedWorkOrders } = require('../controllers/workorderController');
const router = express.Router();

router.get('/created', getCreatedWorkOrders);

module.exports = router;
