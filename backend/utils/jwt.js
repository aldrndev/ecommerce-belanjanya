const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "6h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

const createOtp = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "5m" });
};

const refreshToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

module.exports = { createToken, verifyToken, createOtp, refreshToken };
