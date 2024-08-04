const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authenticate, authorizeAddCart } = require("../middlewares/auth");

router.use(authenticate);
router.get("/profile", UserController.getProfile);
router.get("/cart", UserController.getCart);
router.post("/cart", authorizeAddCart, UserController.addCart);
router.put("/cart", UserController.updateCart);

module.exports = router;
