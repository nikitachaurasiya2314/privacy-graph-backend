import { Request, Response } from "express";
import { verifyGst } from "../services/gst.service";

export const verifyGstController = async (req: Request, res: Response) => {
  try {
    const { gstin } = req.body;

    if (!gstin) {
      return res.status(400).json({ error: "GSTIN is required" });
    }

    const result = await verifyGst(gstin);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({
      valid: false,
      error: err.message,
    });
  }
};