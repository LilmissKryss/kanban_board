import express, { RequestHandler } from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken as unknown as RequestHandler);

// Task routes
router.get("/", getTickets as unknown as RequestHandler);
router.post("/", createTicket as unknown as RequestHandler);
router.put("/:id", updateTicket as unknown as RequestHandler);
router.delete("/:id", deleteTicket as unknown as RequestHandler);

export default router;
