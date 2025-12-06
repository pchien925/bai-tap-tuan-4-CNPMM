// utils/email.js
const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async (toEmail, resetUrl) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    await transporter.sendMail({
        from: `"MyApp" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Đặt lại mật khẩu tài khoản",
        html: `
            <h3>Xin chào,</h3>
            <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
            <p>Nhấp vào link dưới đây để đặt lại (hết hạn sau 15 phút):</p>
            <p><a href="${resetUrl}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a></p>
            <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
        `
    });
};

module.exports = { sendResetPasswordEmail };