import express, { RequestHandler } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getColumns, createColumn, updateColumn, deleteColumn } from '../controllers/columnController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken as unknown as RequestHandler);

// Column routes
router.get('/', getColumns as unknown as RequestHandler);
router.post('/', createColumn as unknown as RequestHandler);
router.put('/:id', updateColumn as unknown as RequestHandler);
router.delete('/:id', deleteColumn as unknown as RequestHandler);

export default router; 