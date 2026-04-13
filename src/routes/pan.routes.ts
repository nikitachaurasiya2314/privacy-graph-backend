import { Router } from "express";
import { verifyPanController } from "../controllers/pan.controller";

const router = Router();

router.post("/verify-pan", verifyPanController);

export default router;