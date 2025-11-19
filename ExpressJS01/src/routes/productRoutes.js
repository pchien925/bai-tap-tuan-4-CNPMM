const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
    create, getAll, getOne, update, remove
} = require('../controllers/productController');

const {
    createProductValidation,
    updateProductValidation,
    getProductValidation,
    deleteProductValidation
} = require('../validators/productValidator');

// Public route
router.get('/', getAll);
router.get('/:id', getProductValidation, validate, getOne);

// Protected routes (admin)
router.post('/', auth('admin'), createProductValidation, validate, create);
router.put('/:id', auth('admin'), updateProductValidation, validate, update);
router.delete('/:id', auth('admin'), deleteProductValidation, validate, remove);

module.exports = router;
