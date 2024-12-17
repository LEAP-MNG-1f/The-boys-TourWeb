import express from "express";
import multer from "multer";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/Category.controllers.js";

const upload = multer({ dest: "./uploads/" });
const categoryRouter = express.Router();

categoryRouter.get("/categories", getAllCategory);
categoryRouter.delete("/categories/:id", deleteCategory);
categoryRouter.post(
  "/categories",
  upload.single("imageCategory"), // "imageCategory" - frontend-с илгээх file input-ын нэр
  createCategory
);

export default categoryRouter;
