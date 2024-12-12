import express from "express";
import { getAllAdmin } from "../controllers/Admin.controllers.js";

const adminRouter = express.Router();

adminRouter.get("/admins", getAllAdmin);

export default adminRouter;
