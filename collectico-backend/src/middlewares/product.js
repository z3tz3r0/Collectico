import express from "express";
import {
  addProduct,
  getProduct,
  getProductByUserId,
  editByPutProduct,
  deleteProduct,
  getAllAuctionProduct,
  getProductById,
  getOnceProductById,
  getProductByGenre,
  getMyProduct,
} from "../controller/productController.js";

import { authUser } from "./authMiddleware.js";
import { Product } from "../models/Product.js";

const router = express.Router();

// Public routes
router.get("/", getProduct);
router.get("/auction", getAllAuctionProduct);
router.get("/genre", getProductByGenre);
router.get("/:id", getOnceProductById);

// Auth routes
router.post("/", authUser, addProduct);
router.get("/auth/my-products", authUser, getMyProduct);
router.get("/auth/:id", authUser, getProductById);
router.get("/auth/user/:userId", authUser, getProductByUserId);
router.put("/auth/:id", authUser, editByPutProduct);
router.delete("/auth/:id", authUser, deleteProduct);

export default router;
