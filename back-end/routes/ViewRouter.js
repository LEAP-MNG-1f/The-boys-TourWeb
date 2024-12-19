import express from "express";
import {
  createView,
  deleteOldViews,
  getAllView,
} from "../controllers/View.controllers.js";

const viewRouter = express.Router();

// Get all views
viewRouter.get("/views", getAllView);

// Post a view and clean old views
viewRouter.post("/views", async (req, res) => {
  try {
    // 30 хоногоос өмнөх views-ийг цэвэрлэх
    await deleteOldViews();

    // Шинэ view нэмэх логик
    await createView(req, res);
  } catch (error) {
    console.error("Error in /views route:", error);
    res.status(500).send({ message: "Error deleting old views", error });
  }
});

export default viewRouter;
