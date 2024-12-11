import express from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/Category.controllers.js";

const categoryRouter = express.Router();

categoryRouter.get("/categories", getAllCategory);
categoryRouter.post("/categories", createCategory);

export default categoryRouter;
