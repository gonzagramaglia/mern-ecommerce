import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  verifyOrder,
  fetchUserOrders,
} from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorders", authMiddleware, fetchUserOrders);

export default orderRouter;
