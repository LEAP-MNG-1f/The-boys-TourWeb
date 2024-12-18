import express from "express";
import {
  createView,
  deleteOldViews,
  getAllView,
} from "../controllers/View.controllers.js";

const viewRouter = express.Router();

viewRouter.get("/views", getAllView);
viewRouter.post("/views", createView);
viewRouter.post("/views", async (req, res) => {
  await deleteOldViews(); // Clean up before adding new view
  // Rest of your view increment logic
});

export default viewRouter;
