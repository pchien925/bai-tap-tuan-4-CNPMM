const { body, param, query } = require('express-validator');

exports.createProductValidation = [
  body('id')
    .notEmpty().withMessage('ID sản phẩm không được để trống')
    .isString().withMessage('ID phải là chuỗi'),

  body('name')
    .notEmpty().withMessage('Tên sản phẩm không được để trống')
    .isLength({ min: 1 }).withMessage('Tên sản phẩm tối thiểu 1 ký tự'),

  body('price')
    .notEmpty().withMessage('Giá sản phẩm không được để trống')
    .isFloat({ min: 0 }).withMessage('Giá sản phẩm phải là số >= 0'),

  body('description')
    .optional()
    .isString().withMessage('Description phải là chuỗi'),

  body('createdAt')
    .optional()
    .isISO8601().withMessage('createdAt phải là ngày hợp lệ'),
];

exports.updateProductValidation = [
  param('id')
    .notEmpty().withMessage('ID sản phẩm không được để trống')
    .isString().withMessage('ID phải là chuỗi'),

  body('name')
    .optional()
    .isLength({ min: 1 }).withMessage('Tên sản phẩm tối thiểu 1 ký tự'),

  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Giá sản phẩm phải là số >= 0'),

  body('description')
    .optional()
    .isString().withMessage('Description phải là chuỗi'),

  body('createdAt')
    .optional()
    .isISO8601().withMessage('createdAt phải là ngày hợp lệ'),
];

exports.getProductValidation = [
  param('id')
    .notEmpty().withMessage('ID sản phẩm không được để trống')
    .isString().withMessage('ID phải là chuỗi')
];

exports.deleteProductValidation = exports.getProductValidation;

// Filter query validation
exports.filterProductValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page phải là số nguyên >= 1'),

  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit phải là số nguyên >= 1'),

  query('priceMin')
    .optional()
    .isFloat({ min: 0 }).withMessage('priceMin phải là số >= 0'),

  query('priceMax')
    .optional()
    .isFloat({ min: 0 }).withMessage('priceMax phải là số >= 0'),

  query('name')
    .optional()
    .isString().withMessage('name phải là chuỗi'),

  query('description')
    .optional()
    .isString().withMessage('description phải là chuỗi'),
];
