const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cart = sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'carts',
    timestamps: true,
    underscored: true,
});

module.exports = Cart;