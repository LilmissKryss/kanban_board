import express from 'express';

const router = express.Router();

// TODO: Implement board routes
router.get('/', (_req, res) => {
  res.json({ message: 'Board routes not implemented yet' });
});

export default router; 