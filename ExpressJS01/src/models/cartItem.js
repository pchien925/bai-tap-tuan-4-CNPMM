// src/models/cartItem.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Cart = require('./cart');
const Product = require('./product'); // Import Product Model của bạn

const CartItem = sequelize.define('CartItem', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'id',
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Có thể tạo Foreign Key tới bảng products
            model: Product,
            key: 'id',
        }
    },
    productName: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: { // Giá tại thời điểm thêm vào giỏ
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    selected: { // Trạng thái chọn để thanh toán
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, {
    tableName: 'cart_items',
    timestamps: true,
    underscored: true,
});

Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

module.exports = CartItem;