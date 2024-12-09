import exrpess from "express";
import {
  createTour,
  deleteFood,
  getAllTours,
  updateFood,
} from "../controllers/Tour.controllers.js";
import multer from "multer";

const upload = multer({ dest: "./uploads/" });
const tourRouter = exrpess.Router();

tourRouter.get("/foods", getAllTours);
tourRouter.post("/create-tour", upload.single("image"), createTour);
tourRouter.put("/update-food/:id", updateFood);
tourRouter.delete("/delete-food/:id", deleteFood);

export default tourRouter;
