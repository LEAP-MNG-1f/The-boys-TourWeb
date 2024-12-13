import express from "express";
import multer from "multer";
import { createEvent, getAllEvent } from "../controllers/Event.controllers.js";

const upload = multer({ dest: "./uploads/" });
const eventRouter = express.Router();

eventRouter.get("/events", getAllEvent);
eventRouter.post(
  "/events",
  upload.single("imageEvent"), // "imageCategory" - frontend-с илгээх file input-ын нэр
  createEvent
);

export default eventRouter;
