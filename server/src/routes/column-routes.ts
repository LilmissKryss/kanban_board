import express from 'express';

const router = express.Router();

// TODO: Implement column routes
router.get('/', (_req, res) => {
  res.json({ message: 'Column routes not implemented yet' });
});

export default router; 