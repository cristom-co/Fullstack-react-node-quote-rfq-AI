import { Request, Response } from "express";
import { processEmail } from "../utils/aiUtils";

export const handleRfq = async (req: Request, res: Response) => {
  const { body } = req.body;

  try {
    const structuredQuote = await processEmail(body);
    //store...
    res
      .status(200)
      .json({ message: "RFQ processed successfully", quote: structuredQuote });
  } catch (error) {
    res.status(500).json({ message: "Error processing RFQs", error });
  }
};
