const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const upload = require("../config/multer");
const { authenticate } = require("../middlewares/auth");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/verify", AuthController.verifyOtp);
router.post(
  "/profile",
  authenticate,
  upload.single("image"),
  AuthController.createProfile
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

module.exports = router;
