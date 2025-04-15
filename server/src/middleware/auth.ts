import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend the Express Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
  // These properties already exist in the Request interface,
  // but TypeScript doesn't recognize them in the AuthenticatedRequest
  // interface unless we explicitly declare them
  body: any;
  params: any;
  headers: any;
  query: any;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user.id, username: user.username };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
