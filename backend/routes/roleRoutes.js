const express = require('express');
const { submitRoleRequest, getRoleRequests } = require('../controllers/roleController');
const checkAdmin = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/', submitRoleRequest);
router.get('/', checkAdmin, getRoleRequests);

module.exports = router;
