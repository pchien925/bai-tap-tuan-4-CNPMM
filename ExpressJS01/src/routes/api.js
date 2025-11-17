// routes/api.js
const express = require('express');
const { 
    createUser, 
    handleLogin, 
    getUser, 
    getAccount,
    forgotPassword,     
    resetPassword    
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// Public routes (không cần token)
routerAPI.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World API' });
});

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);

routerAPI.post('/forgot-password', forgotPassword);
routerAPI.post('/reset-password/:token', resetPassword);

// Protected routes (cần token) → áp dụng auth middleware từ đây trở xuống
routerAPI.use(auth);

routerAPI.get('/user', getUser);
routerAPI.get('/account', delay, getAccount);

module.exports = routerAPI;