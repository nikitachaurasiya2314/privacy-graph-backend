import { Request, Response } from "express";
import {
  createUser,
  validateUser,
  findOrCreateUser,
} from "../services/auth.service";
import { sendOtpService, verifyOtpService } from "../services/otp.service";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await createUser(name, email, password, role);

    res.json({
      message: "User registered",
      user,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    await sendOtpService(email);

    res.json({ message: "OTP sent" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    await verifyOtpService(email, otp);

    const user = await findOrCreateUser(email);

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

