import { Response } from 'express';
import { Ticket } from '../models/ticket.js';
import { Column } from '../models/column.js';
import { Board } from '../models/board.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const getTickets = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{
        model: Column,
        include: [{
          model: Board,
          where: { userId: req.user?.id },
          required: true,
        }],
      }],
    });
    return res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return res.status(500).json({ message: 'Error fetching tickets' });
  }
};

export const createTicket = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, columnId } = req.body;
    
    // Check if the column belongs to a board owned by the user
    const column = await Column.findOne({
      include: [{
        model: Board,
        where: { userId: req.user?.id },
        required: true,
      }],
      where: { id: columnId },
    });
    
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    const ticket = await Ticket.create({
      title,
      description,
      columnId,
      userId: req.user?.id,
      status: 'todo',
    });
    return res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return res.status(500).json({ message: 'Error creating ticket' });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, status, columnId } = req.body;
    const ticket = await Ticket.findOne({
      include: [{
        model: Column,
        include: [{
          model: Board,
          where: { userId: req.user?.id },
          required: true,
        }],
      }],
      where: { id: req.params.id },
    });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.update({ title, description, status, columnId });
    return res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return res.status(500).json({ message: 'Error updating ticket' });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findOne({
      include: [{
        model: Column,
        include: [{
          model: Board,
          where: { userId: req.user?.id },
          required: true,
        }],
      }],
      where: { id: req.params.id },
    });
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.destroy();
    return res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return res.status(500).json({ message: 'Error deleting ticket' });
  }
}; 