import { db } from "../db";
import { parentOrders, subOrders, orderItems } from "../db/schema/order";

export const seedOrders = async () => {
  try {
    const parent = await db.insert(parentOrders).values({
      user_id: "fdf909e5-d24e-4301-bd77-4922f20d0082",
      total_amount: "2000",
      status: "paid",
    }).returning();

    const parentId = parent[0].id;

    const sub1 = await db.insert(subOrders).values({
      parent_order_id: parentId,
      seller_id: "b3bb85c9-fef3-485b-a32c-7fea8fec1bdc",
      subtotal: "1000",
    }).returning();

    const sub2 = await db.insert(subOrders).values({
      parent_order_id: parentId,
      seller_id: "bae74af3-d59c-4bd4-ae66-0956080e68dc",
      subtotal: "1000",
    }).returning();

    await db.insert(orderItems).values([
      {
        sub_order_id: sub1[0].id,
        product_id: "productA",
        quantity: 1,
        price: "1000",
      },
      {
        sub_order_id: sub2[0].id,
        product_id: "productB",
        quantity: 1,
        price: "1000",
      },
    ]);

    console.log("Orders seeded successfully");
  } catch (err) {
    console.error(err);
  }
};