import { Router } from "express";
import { ticketRouter } from "./ticket-routes.js";
import { userRouter } from "./user-routes.js";

const router = Router();

// Health check endpoint for Render
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

router.use("/tickets", ticketRouter);
router.use("/users", userRouter);

export default router;
