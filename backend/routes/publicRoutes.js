const express = require("express");
const router = express.Router();
const PublicController = require("../controllers/publicController");

router.get("/product", PublicController.getAllProduct);
router.get("/product/location", PublicController.getProductByLocation);
router.get("/product/filter", PublicController.getProductWithFilter);
router.get("/review", PublicController.getReviewPublic);
router.get("/product/slug", PublicController.getSlugProduct);
router.get("/product/more", PublicController.getMoreProduct);
router.get("/product/:id", PublicController.getProductById);
router.get("/discussion/:productId", PublicController.getDiscussionPublic);

module.exports = router;
