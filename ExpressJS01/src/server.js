require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/database');
const configViewEngine = require('./config/viewEngine');

// Middleware
const { apiLimiter, authLimiter } = require('./middleware/rateLimit');

// Routes
const apiRoutes = require('./routes/api');

// Controllers
const { getHomepage } = require('./controllers/homeController');
const seed = require('./seeders/seed');

const app = express();
const port = process.env.PORT || 8888;

// =======================
// Middleware
// =======================

// Trust proxy nếu deploy phía Nginx / Cloudflare
app.set('trust proxy', 1);

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger tất cả request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// View engine
configViewEngine(app);

// =======================
// Public routes
// =======================
app.get('/', getHomepage);

// Rate limit cho login/register
app.post('/v1/api/login', authLimiter);
app.post('/v1/api/register', authLimiter);

// =======================
// API routes
// =======================
app.use('/v1/api', apiLimiter); // Giới hạn còn lại
app.use('/v1/api', apiRoutes);   // Router chính gồm user/product

// =======================
// Middleware xử lý lỗi
// =======================
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({
        EC: -1,
        EM: 'Lỗi server',
        details: err.message
    });
});

// =======================
// DB sync & start server
// =======================
(async () => {
    try {
        await testConnection();
        console.log('✅ MySQL Database connected successfully.');

        // Chỉ sync DB tự động khi là dev
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: true });
            console.log('✅ Database synced (alter: true)');
        }
        await seed();

        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Error connecting to MySQL DB: ', error);
    }
})();
