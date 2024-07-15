const transporter = require("../config/nodemailer");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmail = async (email, otp) => {
  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify Email",
    html: `Your OTP is <h1>${otp}</h1>`,
  });
};

module.exports = { generateOTP, sendEmail };
