require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            return {
                EC: 1,
                EM: 'Email đã tồn tại, vui lòng chọn email khác!'
            };
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role: 'user'
        });

        return {
            EC: 0,
            EM: 'Tạo người dùng thành công!',
            DT: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        };
    } catch (error) {
        console.log('createUserService error >>>', error);
        return {
            EC: -1,
            EM: 'Lỗi server'
        };
    }
};

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                EC: 1,
                EM: "Email hoặc mật khẩu không đúng!"
            };
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return {
                EC: 1,
                EM: "Email hoặc mật khẩu không đúng!"
            };
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        const access_token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '7d' }
        );

        return {
            EC: 0,
            EM: 'Đăng nhập thành công',
            DT: {
                access_token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        };
    } catch (error) {
        console.log('loginService error >>>', error);
        return {
            EC: -1,
            EM: 'Lỗi server'
        };
    }
};

const getUserService = async () => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return {
            EC: 0,
            DT: users
        };
    } catch (error) {
        console.log(error);
        return {
            EC: -1,
            EM: 'Lỗi server'
        };
    }
};

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const saveResetToken = async (userId, token, expiresInMinutes = 15) => {
    const hashedToken = await bcrypt.hash(token, 10);
    const expires = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    await User.update({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: expires
    }, {
        where: { id: userId }
    });

    return { token, expires };
};

const getUserByResetToken = async (token) => {
    const users = await User.findAll({
        where: {
            resetPasswordExpires: { [Op.gt]: new Date() }
        }
    });

    for (let user of users) {
        if (user.resetPasswordToken && await bcrypt.compare(token, user.resetPasswordToken)) {
            return user;
        }
    }
    return null;
};

const updatePassword = async (userId, newPassword) => {
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.update({
        password: hashPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
    }, {
        where: { id: userId }
    });
};

module.exports = {
    createUserService,
    loginService,
    getUserService,
    getUserByEmail,
    saveResetToken,
    getUserByResetToken,
    updatePassword
};