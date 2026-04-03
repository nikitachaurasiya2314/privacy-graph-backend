import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { NextFunction, Response } from "express";
import { AuthRequest, AuthUser } from "../types/auth";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;

    req.user = decoded; 

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};