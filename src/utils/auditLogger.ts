import { db } from "../db";
import { auditLogs } from "../db/schema/audit";

type AuditParams = {
  entity_type: "order" | "refund" | "payout";
  entity_id: string;
  old_state?: string;
  new_state?: string;
  amount?: string;
};

export const logAudit = async ({
  entity_type,
  entity_id,
  old_state,
  new_state,
  amount,
}: AuditParams) => {
  try {
    await db.insert(auditLogs).values({
      entity_type,
      entity_id,
      old_state,
      new_state,
      amount,
    });
  } catch (err) {
    console.error("Audit log failed:", err);
  }
};