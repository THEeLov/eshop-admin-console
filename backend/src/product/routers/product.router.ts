import express from "express";
import productController from "../controllers/product.controller";

const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getSingle);

router.post("/", productController.createSingle);

router.put("/:id", productController.updateSingle);

router.delete("/:id", productController.deleteSingle);

export default router;
