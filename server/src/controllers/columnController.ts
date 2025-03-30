import { Response } from 'express';
import { Column } from '../models/column.js';
import { Board } from '../models/board.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const getColumns = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const columns = await Column.findAll({
      include: [{
        model: Board,
        where: { userId: req.user?.id },
        required: true
      }]
    });
    return res.json(columns);
  } catch (error) {
    console.error('Error fetching columns:', error);
    return res.status(500).json({ message: 'Error fetching columns' });
  }
};

export const createColumn = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, boardId } = req.body;
    
    // Check if the board belongs to the user
    const board = await Board.findOne({
      where: { id: boardId, userId: req.user?.id }
    });
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const column = await Column.create({
      title,
      boardId
    });
    return res.status(201).json(column);
  } catch (error) {
    console.error('Error creating column:', error);
    return res.status(500).json({ message: 'Error creating column' });
  }
};

export const updateColumn = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title } = req.body;
    const column = await Column.findOne({
      include: [{
        model: Board,
        where: { userId: req.user?.id },
        required: true
      }],
      where: { id: req.params.id }
    });
    
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    await column.update({ title });
    return res.json(column);
  } catch (error) {
    console.error('Error updating column:', error);
    return res.status(500).json({ message: 'Error updating column' });
  }
};

export const deleteColumn = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const column = await Column.findOne({
      include: [{
        model: Board,
        where: { userId: req.user?.id },
        required: true
      }],
      where: { id: req.params.id }
    });
    
    if (!column) {
      return res.status(404).json({ message: 'Column not found' });
    }

    await column.destroy();
    return res.json({ message: 'Column deleted successfully' });
  } catch (error) {
    console.error('Error deleting column:', error);
    return res.status(500).json({ message: 'Error deleting column' });
  }
}; 