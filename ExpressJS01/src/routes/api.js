const express = require('express');
const { 
    createUser, 
    handleLogin, 
    getUser, 
    getAccount 
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// Middleware áp dụng cho tất cả các route (auth)
routerAPI.use(auth);

// Route: Test API
routerAPI.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World API' });
});

// Route: Đăng ký
routerAPI.post('/register', createUser);

// Route: Đăng nhập
routerAPI.post('/login', handleLogin);

// Route: Lấy thông tin user (cần auth)
routerAPI.get('/user', getUser);

// Route: Lấy thông tin account (có delay để test loading)
routerAPI.get('/account', delay, getAccount);

module.exports = routerAPI; // Export default