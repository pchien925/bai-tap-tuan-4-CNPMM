require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/database');
const configViewEngine = require('./config/viewEngine');
const { swaggerDocs } = require('./config/swagger');
const apiRoutes = require('./routes/api');
const { getHomepage } = require('./controllers/homeController');
const seed = require('./seeders/seed');

const { apiLimiter, authLimiter } = require('./middleware/rateLimit');

// =======================
// Elasticsearch
// =======================
const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({
  node: process.env.ELASTIC_NODE || 'http://localhost:9200',
  tls: { rejectUnauthorized: false }
});

(async () => {
  try {
    const health = await esClient.cluster.health();
    console.log('✅ Elasticsearch cluster health:', health);
  } catch (err) {
    console.error('❌ Elasticsearch connection error:', err);
  }
})();

const app = express();
const port = process.env.PORT || 8888;

// =======================
// Middleware
// =======================
app.set('trust proxy', 1);
app.use(cors());
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
app.use('/v1/api', apiLimiter);
app.use('/v1/api', apiRoutes);

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

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synced (alter: true)');
    }

    await seed();
    swaggerDocs(app); // chạy Swagger Docs

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`📄 Swagger Docs running at http://localhost:${port}/docs`);
    });
  } catch (error) {
    console.error('❌ Error connecting to MySQL DB: ', error);
  }
})();
