require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DB_NAME,
    process.env.MYSQL_DB_USER,
    process.env.MYSQL_DB_PASSWORD,
    {
        host: process.env.MYSQL_DB_HOST,
        dialect: 'mysql',
        logging: console.log,
        define: {
            timestamps: true,
            underscored: true,
        }
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, testConnection };