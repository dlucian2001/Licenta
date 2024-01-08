import express from "express";
import * as ProductController from "../controllers/productController";

const router = express.Router();

router.get("/:productId", ProductController.getProductById);
router.get("/category", ProductController.getProductsByCategory);
router.get("/", ProductController.getProducts);

export default router;
