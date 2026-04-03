import express from "express";
import { sendRequest, acceptRequest, blockUser, listRelationships } from "../controllers/relationship.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/request", authMiddleware, sendRequest);
router.patch("/accept/:id", authMiddleware, acceptRequest);
router.patch("/block/:id", authMiddleware, blockUser);
router.get("/", authMiddleware, listRelationships);

export default router;