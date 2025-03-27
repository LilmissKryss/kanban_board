import express from 'express';

const router = express.Router();

// TODO: Implement task routes
router.get('/', (_req, res) => {
  res.json({ message: 'Task routes not implemented yet' });
});

export default router; 