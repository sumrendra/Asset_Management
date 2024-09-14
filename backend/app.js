const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const roleRoutes = require('./routes/roleRoutes');
const assetRoutes = require('./routes/assetRoutes');
const workorderRoutes = require('./routes/workorderRoutes');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/role-requests', roleRoutes); // Role request routes
app.use('/assets', assetRoutes);        // Asset-related routes
app.use('/work-orders', workorderRoutes); // Work order-related routes

module.exports = app;
