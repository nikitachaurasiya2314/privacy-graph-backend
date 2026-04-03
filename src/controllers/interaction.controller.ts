import { db } from "../db";
import { likes, comments, shares } from "../db/schema";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { eq, and } from "drizzle-orm";



export const likeEntity = async (req: AuthRequest, res: Response) => {
  try {
    const { entity_id, entity_type } = req.body;
    const user_id = req.user!.id;

    const existing = await db.select().from(likes).where(
      and(
        eq(likes.user_id, user_id),
        eq(likes.entity_id, entity_id)
      )
    );

    if (existing.length) {
      return res.status(400).json({ message: "Already liked" });
    }

    const result = await db.insert(likes).values({
      user_id,
      entity_id,
      entity_type,
    }).returning();

    res.json(result[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const unlikeEntity = async (req: AuthRequest, res: Response) => {
  try {
    const { entity_id } = req.body;
    const user_id = req.user!.id;

    await db.delete(likes).where(
      and(
        eq(likes.user_id, user_id),
        eq(likes.entity_id, entity_id)
      )
    );

    res.json({ message: "Unliked successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};



export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { entity_id, entity_type, content } = req.body;
    const user_id = req.user!.id;

    const result = await db.insert(comments).values({
      user_id,
      entity_id,
      entity_type,
      content,
    }).returning();

    res.json(result[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const getComments = async (req: AuthRequest, res: Response) => {
  try {
    const { entity_id } = req.query;

    const result = await db.select().from(comments).where(
      eq(comments.entity_id, entity_id as string)
    );

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};



export const shareEntity = async (req: AuthRequest, res: Response) => {
  try {
    const { entity_id, entity_type } = req.body;
    const user_id = req.user!.id;

    const result = await db.insert(shares).values({
      user_id,
      entity_id,
      entity_type,
    }).returning();

    res.json(result[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};