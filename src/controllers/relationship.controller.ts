import { db } from "../db";
import { relationships } from "../db/schema/relationships";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { eq, and } from "drizzle-orm";

export const sendRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { recipient_id } = req.body;
    const requester_id = req.user!.id;

    if (recipient_id === requester_id) {
      return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    const existing = await db
      .select()
      .from(relationships)
      .where(
        and(
          eq(relationships.requester_id, requester_id),
          eq(relationships.recipient_id, recipient_id)
        )
      );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Request already exists" });
    }

    const newRel = await db.insert(relationships).values({
      requester_id,
      recipient_id,
      status: "pending",
    }).returning();

    res.json(newRel[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const acceptRequest = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const updated = await db.update(relationships)
      .set({ status: "accepted" })
      .where(eq(relationships.id, id))
      .returning();

    res.json(updated[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const updated = await db.update(relationships)
      .set({ status: "blocked" })
      .where(eq(relationships.id, id))
      .returning();

    res.json(updated[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const listRelationships = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const rels = await db.select().from(relationships).where(
      eq(relationships.requester_id, userId)
    );

    res.json(rels);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};