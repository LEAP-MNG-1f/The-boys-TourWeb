import express from "express";
import multer from "multer";
import {
  createTeams,
  deleteTeam,
  getAllTeams,
} from "../controllers/Team.controllers.js";
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

const teamRouter = express.Router();

teamRouter.get("/teams", getAllTeams);
teamRouter.delete("/teams", deleteTeam);
teamRouter.post(
  "/teams",
  upload.single("imageTeam"), // "imageCategory" - frontend-с илгээх file input-ын нэр
  createTeams
);

export default teamRouter;
