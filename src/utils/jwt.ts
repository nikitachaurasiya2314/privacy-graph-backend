import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};