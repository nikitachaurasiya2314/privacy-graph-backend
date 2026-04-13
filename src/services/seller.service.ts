import { db } from "../db";
import { sellerProfiles } from "../db/schema/seller";

export const createSellerProfile = async (
  userId: string,
  data: {
    shopName: string;
    phone: string;
    address: string;
    hasGst: boolean;
    gstin?: string;
    eid?: string;
  }
) => {
  try {
    const result = await db
      .insert(sellerProfiles)
      .values({
        userId,
        shopName: data.shopName,
        phone: data.phone,
        address: data.address,
        hasGst: data.hasGst,
        gstin: data.hasGst ? data.gstin : null,
        eid: !data.hasGst ? data.eid : null,
      })
      .returning();

    return result[0];
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("Seller profile already exists");
    }
    throw error;
  }
};