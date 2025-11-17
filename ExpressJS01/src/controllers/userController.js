const {
    createUserService,
    loginService,
    getUserService,
    getUserByEmail,
    saveResetToken,
    getUserByResetToken,
    updatePassword
} = require("../services/userService");
const { sendResetPasswordEmail } = require("../util/email");

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data)
}

const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data)
}

const getAccount = async (req, res) => {
    return res.status(200).json(req.user)
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            // Bảo mật: không nói user có tồn tại hay không
            return res.status(200).json({
                EC: 0,
                EM: "Nếu email tồn tại, link đặt lại mật khẩu đã được gửi!"
            });
        }

        // Tạo token
        const resetToken = crypto.randomBytes(32).toString("hex");
        await saveResetToken(user.id, resetToken);

        // Gửi email
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendResetPasswordEmail(email, resetUrl);

        return res.status(200).json({
            EC: 0,
            EM: "Link đặt lại mật khẩu đã được gửi đến email của bạn!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: "Gửi email thất bại, vui lòng thử lại sau"
        });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({
            EC: 1,
            EM: "Mật khẩu phải có ít nhất 6 ký tự"
        });
    }

    try {
        const user = await getUserByResetToken(token);
        if (!user) {
            return res.status(400).json({
                EC: 1,
                EM: "Token không hợp lệ hoặc đã hết hạn"
            });
        }

        await updatePassword(user.id, password);

        return res.status(200).json({
            EC: 0,
            EM: "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: "Lỗi server"
        });
    }
};

module.exports = {
    createUser,
    handleLogin,
    getUser,
    getAccount,
    forgotPassword,
    resetPassword
};