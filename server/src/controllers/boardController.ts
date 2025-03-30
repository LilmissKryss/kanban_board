import { Response } from 'express';
import { Board } from '../models/board.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const getBoards = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const boards = await Board.findAll({
      where: { userId: req.user?.id }
    });
    return res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return res.status(500).json({ message: 'Error fetching boards' });
  }
};

export const createBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title } = req.body;
    const board = await Board.create({
      title,
      userId: req.user?.id
    });
    return res.status(201).json(board);
  } catch (error) {
    console.error('Error creating board:', error);
    return res.status(500).json({ message: 'Error creating board' });
  }
};

export const getBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, userId: req.user?.id }
    });
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    return res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    return res.status(500).json({ message: 'Error fetching board' });
  }
};

export const updateBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title } = req.body;
    const board = await Board.findOne({
      where: { id: req.params.id, userId: req.user?.id }
    });
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    await board.update({ title });
    return res.json(board);
  } catch (error) {
    console.error('Error updating board:', error);
    return res.status(500).json({ message: 'Error updating board' });
  }
};

export const deleteBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, userId: req.user?.id }
    });
    
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    
    await board.destroy();
    return res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error deleting board:', error);
    return res.status(500).json({ message: 'Error deleting board' });
  }
}; 