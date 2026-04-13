import { db } from "../db";
import { users, userRoleEnum } from "../db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const createUser = async (
  name: string,
  email: string,
  password?: string,
  role?: (typeof userRoleEnum.enumValues)[number]
) => {
  const hashedPassword = password
    ? await bcrypt.hash(password, 10)
    : null;

  try {
    const newUser = await db
      .insert(users)
      .values({
        name: name || null,
        email,
        password: hashedPassword,
        role: role || "buyer",
      })
      .returning();

    return newUser[0];
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

export const validateUser = async (email: string, password: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user.length) {
    throw new Error("User not found");
  }

  if (!user[0].password) {
    throw new Error("Use OTP or Google login");
  }

  const isMatch = await bcrypt.compare(
    password,
    user[0].password as string
  );

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user[0];
};

export const findUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  return user[0];
};

// export const findOrCreateUser = async (
//   email: string,
//   name?: string
// ) => {
//   const inserted = await db
//     .insert(users)
//     .values({
//       email,
//       name: name || null,
//       password: null,
//       role: "buyer",
//     })
//     .onConflictDoNothing()
//     .returning();

//   if (inserted.length) return inserted[0];

//   const existing = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, email));

//   return existing[0];
// };