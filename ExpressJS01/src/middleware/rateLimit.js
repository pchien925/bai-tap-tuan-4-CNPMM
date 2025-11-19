const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        EC: 429,
        EM: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // giới hạn login/register 5 lần mỗi 15 phút
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        EC: 429,
        EM: 'Bạn đã gửi quá nhiều lần đăng nhập/đăng ký. Vui lòng thử lại sau 15 phút.'
    }
});

module.exports = { apiLimiter, authLimiter };
