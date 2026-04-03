import { seedOrders } from "./seeders/orderSeeder";
    import { logAudit } from "./utils/auditLogger";


const runSeed = async () => {
  try {
    await seedOrders();


await logAudit({
  entity_type: "order",
  entity_id: "test-order-123",
  old_state: "pending",
  new_state: "paid",
  amount: "2000",
});
    console.log("Seeding completed");
    process.exit(0);
  } catch (err) {
    console.error(" Seeding failed:", err);
    process.exit(1);
  }
};

runSeed();