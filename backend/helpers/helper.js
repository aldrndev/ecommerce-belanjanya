const transporter = require("../config/nodemailer");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmail = async (email, otp) => {
  const emailContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Email</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }

        .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        .otp {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://belanjanya.aldrincloud.com/logo2.png" alt="Logo" width="100">
        <h1>Verifikasi Email</h1>
        <p>Masukkan kode OTP berikut untuk memverifikasi email Anda:</p>
        <div class="otp">${otp}</div>
        <p>Kode OTP ini akan kedaluwarsa dalam waktu 5 menit.</p>
    </div>
</body>
</html>`;

  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verifikasi Email",
    html: emailContent,
  });
};

module.exports = { generateOTP, sendEmail };
