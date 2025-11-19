require('dotenv').config();
const jwt = require('jsonwebtoken');

// Các route công khai
const whitelist = [
    { path: '/', method: 'GET' },
    { path: '/login', method: 'POST' },
    { path: '/register', method: 'POST' },
    { path: '/forgot-password', method: 'POST' },
    { path: '/reset-password/:token', method: 'POST' }
];

/**
 * Middleware xác thực + phân quyền
 * @param {string|array} roles - nếu truyền vào thì kiểm tra role
 */
const auth = (roles = []) => {
    // Nếu roles là string, convert sang array
    if (typeof roles === 'string') roles = [roles];

    return (req, res, next) => {
        const requestPath = req.originalUrl.replace('/v1/api', '');
        const requestMethod = req.method;

        // Nếu route công khai → next
        const isWhitelisted = whitelist.some(
            (item) => item.path === requestPath && item.method === requestMethod
        );
        if (isWhitelisted) return next();

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                EC: 401,
                EM: "Thiếu Authorization header. Cần dạng: Bearer <token>"
            });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                EC: 401,
                EM: "Authorization header không đúng định dạng. Cần: Bearer <token>"
            });
        }

        const token = parts[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role,
            };

            // Nếu truyền roles vào, kiểm tra quyền
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    EC: 403,
                    EM: "Bạn không có quyền truy cập"
                });
            }

            console.log(">>> Token hợp lệ:", decoded);
            next();
        } catch (err) {
            return res.status(401).json({
                EC: 401,
                EM: "Token hết hạn hoặc không hợp lệ"
            });
        }
    };
};

module.exports = auth;
