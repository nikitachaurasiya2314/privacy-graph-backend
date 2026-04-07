import { db } from "../db";
import { otps } from "../db/schema/otps";
import { eq, desc } from "drizzle-orm";
import { generateOtp, hashOtp } from "../utils/otp";

export const sendOtpService = async (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const existing = await db
    .select()
    .from(otps)
    .where(eq(otps.email, email))
    .orderBy(desc(otps.createdAt))
    .limit(1);

  if (existing.length) {
    const lastOtp = existing[0];

    const diff = Date.now() - new Date(lastOtp.createdAt!).getTime();

    if (diff < 60 * 1000) {
      throw new Error("Please wait before requesting another OTP");
    }
  }
  const otp = generateOtp();
  const hashedOtp = hashOtp(otp);

  await db.delete(otps).where(eq(otps.email, email));

  await db.insert(otps).values({
    email,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  console.log("OTP:", otp);
};

export const verifyOtpService = async (email: string, otp: string) => {
  const hashedOtp = hashOtp(otp);

  const record = await db.select().from(otps).where(eq(otps.email, email));

  if (!record.length) throw new Error("OTP not found");

  const validOtp = record[0];

  if (validOtp.otp !== hashedOtp) throw new Error("Invalid OTP");

  if (new Date() > validOtp.expiresAt) throw new Error("OTP expired");

  await db.delete(otps).where(eq(otps.email, email));

  return true;
};
