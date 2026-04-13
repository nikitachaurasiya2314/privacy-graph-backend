import { seedUsers } from "../seeders/seedUsers";
import { seedOrders } from "../seeders/orderSeeder";

async function runSeed() {
  try {
    console.log("🚀 Starting database seeding...");

    await seedUsers();
    await seedOrders();

    console.log("🎉 All seeds completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

runSeed();