const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

const createOtp = (userId, otp) => {
  return jwt.sign({ userId, otp }, secretKey, { expiresIn: "5m" });
};

module.exports = { createToken, verifyToken, createOtp };
