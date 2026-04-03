import { db } from "../db";
import { users } from "../db/schema/users";import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { env } from "../config/env";
import { Request, Response } from "express";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: role || "buyer",
    }).returning();

    res.json({
      message: "User registered",
      user: newUser[0],
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user.length) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};