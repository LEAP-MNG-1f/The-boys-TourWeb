import express from "express";
import { createView, getAllView } from "../controllers/View.controllers.js";

const viewRouter = express.Router();

viewRouter.get("/views", getAllView);
viewRouter.post("/views", createView);

export default viewRouter;
