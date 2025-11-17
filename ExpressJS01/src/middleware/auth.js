require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const whiteList = ['/', '/register', '/login'];
    if (whiteList.find(item => '/v1/api' + item === req.originalUrl)) {
        next();
        return;
    }
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                email: decoded.email,
                name: decoded.name,
                createdBy: "Hoidanit"
            }
            console.log(">>> check token:", decoded)
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token bị hết hạn/hoặc không hợp lệ"
            })
        }
    } else {
        return res.status(401).json({
            message: "Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn"
        })
    }
}

module.exports = auth;