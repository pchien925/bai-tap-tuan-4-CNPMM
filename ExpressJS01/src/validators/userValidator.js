const { body, param } = require("express-validator");

exports.registerValidation = [
    body("name")
        .notEmpty().withMessage("Tên không được để trống")
        .isLength({ min: 3 }).withMessage("Tên phải ít nhất 3 ký tự"),

    body("email")
        .notEmpty().withMessage("Email không được để trống")
        .isEmail().withMessage("Email không hợp lệ"),

    body("password")
        .notEmpty().withMessage("Mật khẩu không được để trống")
        .isLength({ min: 6 }).withMessage("Mật khẩu phải ít nhất 6 ký tự"),
];

exports.loginValidation = [
    body("email")
        .notEmpty().withMessage("Email không được để trống")
        .isEmail().withMessage("Email không hợp lệ"),

    body("password")
        .notEmpty().withMessage("Mật khẩu không được để trống")
];

exports.forgotPasswordValidation = [
    body("email")
        .notEmpty().withMessage("Email không được để trống")
        .isEmail().withMessage("Email không hợp lệ"),
];

exports.resetPasswordValidation = [
    param("token")
        .notEmpty().withMessage("Token không hợp lệ"),

    body("password")
        .notEmpty().withMessage("Mật khẩu không được để trống")
        .isLength({ min: 6 }).withMessage("Mật khẩu phải ít nhất 6 ký tự"),
];
