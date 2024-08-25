import express from "express";
import authMiddleware from "./../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  usersOders,
  verifyOrders,
} from "../controllers/orderController.js";

const ordeRouter = express.Router();

ordeRouter.post("/place", authMiddleware, placeOrder);
ordeRouter.post("/verify", verifyOrders);
ordeRouter.post("/usersorders", authMiddleware, usersOders);
ordeRouter.get("/list", listOrders);
ordeRouter.post("/status", updateStatus);
export default ordeRouter;
