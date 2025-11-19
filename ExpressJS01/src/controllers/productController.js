// controllers/productController.js
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../services/productService');

const create = async (req, res) => {
    const data = await createProduct(req.body);
    return res.status(200).json(data);
};

const getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getAllProducts(page, limit);
    return res.status(200).json(data);
};

const getOne = async (req, res) => {
    const { id } = req.params;
    const data = await getProductById(id);
    return res.status(200).json(data);
};

const update = async (req, res) => {
    const { id } = req.params;
    const data = await updateProduct(id, req.body);
    return res.status(200).json(data);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const data = await deleteProduct(id);
    return res.status(200).json(data);
};

module.exports = { create, getAll, getOne, update, remove };
