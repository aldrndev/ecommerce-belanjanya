const express = require("express");
const router = express.Router();
const SellerController = require("../controllers/sellerController");
const upload = require("../config/multer");
const { authenticate, authorizeSeller } = require("../middlewares/auth");

router.use(authenticate);
router.post("/register", upload.single("image"), SellerController.register);
router.post(
  "/product",
  authorizeSeller,
  upload.array("image", 9),
  SellerController.addProduct
);

module.exports = router;
