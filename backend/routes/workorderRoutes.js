const express = require('express');
const { getCreatedWorkOrders, getUpdatedWorkOrders } = require('../controllers/workorderController');
const router = express.Router();

router.get('/created', getCreatedWorkOrders);
router.get('/updated', getCreatedWorkOrders);


module.exports = router;
