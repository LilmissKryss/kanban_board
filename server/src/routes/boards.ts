import express, { RequestHandler } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getBoards, createBoard, getBoard, updateBoard, deleteBoard } from '../controllers/boardController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken as unknown as RequestHandler);

// Board routes
router.get('/', getBoards as unknown as RequestHandler);
router.post('/', createBoard as unknown as RequestHandler);
router.get('/:id', getBoard as unknown as RequestHandler);
router.put('/:id', updateBoard as unknown as RequestHandler);
router.delete('/:id', deleteBoard as unknown as RequestHandler);

export default router; 