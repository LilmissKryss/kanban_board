import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';

// Get all tickets
export const getAllTickets = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['username']
      }]
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};

// Get ticket by ID
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['username']
      }]
    });

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket' });
  }
};

// Create ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ticket' });
  }
};

// Update ticket
export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    await ticket.update(req.body);
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ticket' });
  }
};

// Delete ticket
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    await ticket.destroy();
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket' });
  }
};
