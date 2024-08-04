const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const sellerRoutes = require("./sellerRoutes");
const userRoutes = require("./userRoutes");
const publicRoutes = require("./publicRoutes");

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/seller", sellerRoutes);
router.use("/api/public", publicRoutes);

module.exports = router;
