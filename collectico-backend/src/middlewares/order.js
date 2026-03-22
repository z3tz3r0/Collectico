import express from "express";
import { authUser } from "./authMiddleware.js";
import { addOrder, getOrder } from "../controller/orderController.js";

const router = express.Router();

// Auth routes
router.post("/", authUser, addOrder);
router.get("/", authUser, getOrder);

export default router;


