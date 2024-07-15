const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const sellerRoutes = require("./sellerRoutes");
const userRoutes = require("./userRoutes");

router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);
router.use("/api/seller", sellerRoutes);

module.exports = router;
