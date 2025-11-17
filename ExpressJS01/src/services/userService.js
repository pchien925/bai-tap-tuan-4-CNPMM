require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            console.log(`>>> User exist, chọn email khác: ${email}`);
            return null;
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const result = await User.create({
            name,
            email,
            password: hashPassword,
            role: 'user'
        });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            };
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return {
                EC: 2,
                EM: "Email/Password không hợp lệ"
            };
        }

        const payload = {
            email: user.email,
            name: user.name
        };

        const access_token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        return {
            EC: 0,
            access_token,
            user: {
                email: user.email,
                name: user.name
            }
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserService = async () => {
    try {
        const result = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createUserService,
    loginService,
    getUserService
};