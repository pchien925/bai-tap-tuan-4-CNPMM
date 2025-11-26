const productService = require('../services/productESService');

exports.create = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const products = await productService.getAllProducts(Number(page), Number(limit));
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filter = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const products = await productService.filterProducts({ ...filters, page, limit });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};