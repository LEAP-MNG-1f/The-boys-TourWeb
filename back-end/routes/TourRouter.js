import express from "express";
import {
  createTour,
  getAllTours,
  getSingleTour,
} from "../controllers/Tour.controllers.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
});

const tourRouter = express.Router();

tourRouter.post("/tours", upload.array("images", 5), createTour);
tourRouter.get("/tours/", getAllTours);
tourRouter.get("/tours/:title", getSingleTour);

export default tourRouter;
