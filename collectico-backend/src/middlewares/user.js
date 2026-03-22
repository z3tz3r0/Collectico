import express from "express";
import { getUser, registerUser , loginUser, resetPassword, getUserById, logoutUser, verifyToken } from "../controller/usersControllers.js";
import { authUser } from "./authMiddleware.js";

const router = express.Router()

// Register user
router.post("/register", registerUser)

// Login User
router.post("/login", loginUser)

// Reset password
router.patch("/resetpassword", resetPassword)

// Get users
router.get("/", getUser)
router.get("/:id", getUserById)

// Auth routes
router.get("/auth/verify-token", authUser, verifyToken);
router.post("/auth/logout", authUser, logoutUser);

export default router;