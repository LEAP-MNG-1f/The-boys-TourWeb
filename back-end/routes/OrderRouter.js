import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
} from "../controllers/Order.controllers.js";

const orderRouter = express.Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.post("/orders", createOrder);
orderRouter.delete("/orders", deleteOrder);

export default orderRouter;
