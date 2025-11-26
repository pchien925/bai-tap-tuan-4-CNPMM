const express = require('express');
const router = express.Router();
const productController = require('../controllers/productESController');
const auth = require('../middleware/auth'); 
const validate = require('../middleware/validate');
const {
  createProductValidation,
  updateProductValidation,
  getProductValidation,
  deleteProductValidation,
  filterProductValidation
} = require('../validators/productESValidator');

// =======================
// Public routes
// =======================
router.get('/', productController.getAll);
router.get('/filter', filterProductValidation, validate, productController.filter);
router.get('/:id', getProductValidation, validate, productController.getOne);

// =======================
// Protected routes (admin)
// =======================
router.post('/', auth('admin'), createProductValidation, validate, productController.create);
router.put('/:id', auth('admin'), updateProductValidation, validate, productController.update);
router.delete('/:id', auth('admin'), deleteProductValidation, validate, productController.remove);

module.exports = router;
