import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  username: string;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as AuthRequest).user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
