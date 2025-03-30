import express from "express";
import authRoutes from "./auth.js";
import boardRoutes from "./boards.js";
import columnRoutes from "./columns.js";
import taskRoutes from "./tasks.js";
import { userRouter } from "./api/user-routes.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.use("/auth", authRoutes);

// Protected routes
router.use("/boards", authenticateToken, boardRoutes);
router.use("/columns", authenticateToken, columnRoutes);
router.use("/tasks", authenticateToken, taskRoutes);
router.use("/users", authenticateToken, userRouter);

export default router;
