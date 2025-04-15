import express from 'express';
import { getTickets, createTicket, updateTicket, deleteTicket } from '../../controllers/ticketController.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all tickets
router.get('/', getTickets);

// Create a new ticket
router.post('/', createTicket);

// Update a ticket
router.put('/:id', updateTicket);

// Delete a ticket
router.delete('/:id', deleteTicket);

export const ticketRouter = router; 