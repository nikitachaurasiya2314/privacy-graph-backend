import express from "express";
import {
  register,
  login,
  sendOtp,
  verifyOtp,
} from "../controllers/auth.controller";
import { otpLimiter } from "../middleware/rateLimit.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", otpLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);


export default router;
