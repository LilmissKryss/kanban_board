import express from 'express';
import authRoutes from './auth-routes.js';
import boardRoutes from './board-routes.js';
import columnRoutes from './column-routes.js';
import taskRoutes from './task-routes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/boards', authenticateToken, boardRoutes);
router.use('/columns', authenticateToken, columnRoutes);
router.use('/tasks', authenticateToken, taskRoutes);

export default router;
