import express from "express";
import {
  likeEntity,
  unlikeEntity,
  addComment,
  getComments,
  shareEntity,
} from "../controllers/interaction.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Likes
router.post("/likes", authMiddleware, likeEntity);
router.delete("/likes", authMiddleware, unlikeEntity);

// Comments
router.post("/comments", authMiddleware, addComment);
router.get("/comments", authMiddleware, getComments);

// Shares
router.post("/shares", authMiddleware, shareEntity);

export default router;