require('dotenv').config();

// Import các module cần thiết
const express = require('express');
const cors = require('cors');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const { sequelize, testConnection } = require('./config/database'); // Dùng Sequelize
const { getHomepage } = require('./controllers/homeController');

const app = express();
const port = process.env.PORT || 8888;

// Cấu hình middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình template engine
configViewEngine(app);

// Cấu hình routes
app.get('/', getHomepage); // Trang chủ
app.use('/v1/api', apiRoutes); // API routes

// Kết nối DB (MySQL) và khởi động server
(async () => {
    try {
        // Kiểm tra kết nối
        await testConnection();

        // Đồng bộ models (tạo bảng nếu chưa có)
        await sequelize.sync({ alter: true }); // alter: true → tự động cập nhật bảng nếu có thay đổi
        console.log('MySQL Database synced successfully.');

        // Khởi động server
        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`);
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.log(">>> Error connecting to MySQL DB: ", error);
    }
})();