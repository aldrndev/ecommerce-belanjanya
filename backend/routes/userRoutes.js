const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authenticate, authorizeAddCart } = require("../middlewares/auth");

router.use(authenticate);
router.get("/profile", UserController.getProfile);
router.get("/cart", UserController.getCart);
router.post("/cart", authorizeAddCart, UserController.addCart);
router.put("/cart", UserController.updateCart);
router.delete("/cart", UserController.removeCart);
router.delete("/cart/bulk", UserController.bulkRemoveCart);
router.post("/wishlist", UserController.addWishlist);
router.get("/wishlist", UserController.getWishlist);
router.delete("/wishlist", UserController.removeWishlist);
router.post("/checkout", UserController.addCheckout);
router.get("/checkout", UserController.getCheckout);
router.post("/shipment", UserController.addShipmentInfo);
router.get("/shipment", UserController.getShipmentInfo);
router.get("/order", UserController.getOrders);
router.post("/order", UserController.addOrder);

module.exports = router;
