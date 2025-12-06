require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            // Giải mã token nhưng không chặn lỗi
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Đính kèm thông tin user vào req
            req.user = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role,
            };
        } catch (err) {
            // Token không hợp lệ hoặc hết hạn -> req.user vẫn undefined
            console.log('Token for GraphQL is invalid/expired.');
        }
    }
    next();
};

module.exports = {
    jwtMiddleware, 
};