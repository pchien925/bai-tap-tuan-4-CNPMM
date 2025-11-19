// services/productService.js
const Product = require('../models/product');

const createProduct = async (data) => {
    try {
        const product = await Product.create(data);
        return { EC: 0, EM: 'Tạo sản phẩm thành công', DT: product };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
};

const getAllProducts = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;
        const { count, rows } = await Product.findAndCountAll({
            offset,
            limit,
            order: [['id', 'ASC']], // hoặc theo trường khác
        });
        return { 
            EC: 0, 
            DT: rows, 
            total: count, 
            page, 
            limit 
        };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) return { EC: 1, EM: 'Sản phẩm không tồn tại' };
        return { EC: 0, DT: product };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
};

const updateProduct = async (id, data) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) return { EC: 1, EM: 'Sản phẩm không tồn tại' };

        await product.update(data);
        return { EC: 0, EM: 'Cập nhật sản phẩm thành công', DT: product };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
};

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) return { EC: 1, EM: 'Sản phẩm không tồn tại' };

        await product.destroy();
        return { EC: 0, EM: 'Xóa sản phẩm thành công' };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
