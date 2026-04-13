import { Request, Response } from "express";
import {
  createUser,
  validateUser,
  findUserByEmail,
  
  // findOrCreateUser,
} from "../services/auth.service";
import { createSellerProfile } from "../services/seller.service";
import { sendOtpService, verifyOtpService } from "../services/otp.service";
import { generateToken } from "../utils/jwt";
import { db } from "../db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";

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

     if (!user.isVerified) {
      throw new Error("Please verify OTP first");
    }

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

    const user = await findUserByEmail(email);
     if (!user) {
      throw new Error("User not found");
    }

    await db
      .update(users)
      .set({ isVerified: true })
      .where(eq(users.email, email));
    
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const registerSeller = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      shopName,
      phone,
      address,
      hasGst,
      gstin,
      eid,
    } = req.body;

    const user = await createUser(fullName, email, password, "seller");

    await createSellerProfile(user.id, {
      shopName,
      phone,
      address,
      hasGst,
      gstin,
      eid,
    });

    await sendOtpService(email);

    res.json({
      message: "Seller registered. OTP sent.",
      email,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};