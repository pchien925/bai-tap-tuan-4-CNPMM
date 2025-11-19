// routes/api.js
const express = require('express');
const routerAPI = express.Router();

// Import các route riêng
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes'); // nếu đã có product routes

// Mount các route
routerAPI.use('/users', userRoutes);
routerAPI.use('/products', productRoutes); // nếu bạn đã tạo product route

module.exports = routerAPI;
