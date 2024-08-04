const express = require("express");
const router = express.Router();
const PublicController = require("../controllers/publicController");

router.get("/product", PublicController.getAllProduct);
router.get("/product/location", PublicController.getProductByLocation);
router.get("/product/filter", PublicController.getProductWithFilter);
router.get("/product/:id", PublicController.getProductById);

module.exports = router;
