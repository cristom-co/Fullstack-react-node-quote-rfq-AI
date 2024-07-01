import { Request, Response } from "express";
import { processEmail } from "../utils/aiUtils";
import {
  getClientEntities,
  getProductEntities,
} from "../utils/rfqUtils";

import { seederProducts, findProductIfExist, createQoute, getAllQuotes } from "../services/rfqService";

export const handleRfq = async (req: Request, res: Response) => {
  const { body } = req.body;
  const responseProcessEmail = await processEmail(body);

  if (responseProcessEmail.status) {
  
    let client = getClientEntities(responseProcessEmail, body)
    let products = getProductEntities(responseProcessEmail.entities, client)
  
    // insert default products
    seederProducts().then(async() => {
      //valid if the product exists
      const currentProducts = await findProductIfExist(products)
      //store quote
      createQoute(client, currentProducts).then(() => {
        res
          .status(200)
          .json({ message: "RFQ processed successfully", client, products });
      });
     });

  } else {
    res.status(500).json({ message: "Error processing RFQs" });
  }
};

export const handleQoutes = async (req: Request, res: Response) => {
  const qoutes = await getAllQuotes()
  try {
    res
    .status(200)
    .json({ message: "Qoute list", qoutes });
  } catch (error) {
    res.status(500).json({ message: "Error Quotes" });
    
  }

}