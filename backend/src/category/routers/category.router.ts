import express from "express";
import categoryController from "../controllers/category.controller";


const router = express.Router();

router.get('/', categoryController.getAll);
router.get("/:id", categoryController.getSingle);

router.post("/", categoryController.createSingle);

router.put("/:id", categoryController.updateSingle);

router.delete("/:id", categoryController.deleteSingle);


export default router;
