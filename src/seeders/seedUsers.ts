import { db } from "../db/index";
import { users } from "../db/schema/users";
import bcrypt from "bcryptjs";

async function hash(p: string) {
  return bcrypt.hash(p, 10);
}

export async function seedUsers() {
      await db.insert(users).values([
    {
      name: "Admin User",
      email: "admin@zopcial.com",
      password: await hash("Admin@123"),
      role: "admin",
      isVerified: true,
    },
    {
      name: "Seller User",
      email: "seller@zopcial.com",
      password: await hash("Seller@123"),
      role: "seller",
      isVerified: true,
    },
    {
      name: "Manager User",
      email: "manager@zopcial.com",
      password: await hash("Manager@123"),
      role: "creator", 
      isVerified: true,
    },
  ]);

  console.log("Users seeded successfully 🚀");
  process.exit(0);
}

seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});