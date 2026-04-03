import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("ENV CHECK:", process.env.DB_NAME);
export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: false,
  },
} satisfies Config;
