// routes/userRoutes.js
const express = require('express');
const router = express.Router();
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
const validate = require("../middleware/validate");

const {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
} = require("../validators/userValidator");

// =======================
// Public routes
// =======================
router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World API' });
});

router.post('/register', registerValidation, validate, createUser);
router.post('/login', loginValidation, validate, handleLogin);
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidation, validate, resetPassword);

// =======================
// Protected routes
// =======================
router.get('/user', auth(), getUser);
router.get('/account', auth('admin'), delay, getAccount);

module.exports = router;
