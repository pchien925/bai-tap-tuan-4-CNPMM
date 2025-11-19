// validators/productValidator.js
const { body, param } = require('express-validator');

exports.createProductValidation = [
    body('name')
        .notEmpty().withMessage('Tên sản phẩm không được để trống')
        .isLength({ min: 1 }).withMessage('Tên sản phẩm tối thiểu 1 ký tự'),
    
    body('price')
        .notEmpty().withMessage('Giá sản phẩm không được để trống')
        .isFloat({ min: 0 }).withMessage('Giá sản phẩm phải là số và >= 0'),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Số lượng phải là số nguyên >= 0'),

    body('category')
        .optional()
        .isString().withMessage('Category phải là chuỗi'),

    body('soldOut')
        .optional()
        .isBoolean().withMessage('soldOut phải là boolean'),
];

exports.updateProductValidation = [
    param('id')
        .notEmpty().withMessage('ID sản phẩm không được để trống')
        .isInt().withMessage('ID phải là số nguyên'),

    body('name')
        .optional()
        .isLength({ min: 1 }).withMessage('Tên sản phẩm tối thiểu 1 ký tự'),

    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Giá sản phẩm phải là số và >= 0'),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Số lượng phải là số nguyên >= 0'),

    body('category')
        .optional()
        .isString().withMessage('Category phải là chuỗi'),

    body('soldOut')
        .optional()
        .isBoolean().withMessage('soldOut phải là boolean'),
];

exports.getProductValidation = [
    param('id')
        .notEmpty().withMessage('ID sản phẩm không được để trống')
        .isInt().withMessage('ID phải là số nguyên')
];

exports.deleteProductValidation = exports.getProductValidation;
