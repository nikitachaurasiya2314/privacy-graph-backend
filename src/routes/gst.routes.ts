import { Router } from "express";
import { verifyGstController } from "../controllers/gst.controller";

const router = Router();

router.post("/verify-gst", verifyGstController);

export default router;