import { Request, Response } from "express";
import { verifyPan } from "../services/pan.service";

export const verifyPanController = async (req: Request, res: Response) => {
  try {
    const { pan } = req.body;

    if (!pan) {
      return res.status(400).json({ error: "PAN is required" });
    }

    const result = await verifyPan(pan);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({
      valid: false,
      error: err.message,
    });
  }
};