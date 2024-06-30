import { Request, Response } from "express";
import { processEmail } from "../utils/aiUtils";
import {
  getClientEntities,
  getProductEntities,
} from "../utils/rfqUtils";

import { getAllProducts, seederProducts } from "../services/rfqService";

export const handleRfq = async (req: Request, res: Response) => {
  const { body } = req.body;
  const responseProcessEmail = await processEmail(body);
  
  let client = getClientEntities(responseProcessEmail, body)
  let products = getProductEntities(responseProcessEmail.entities, client)

  //inserta los productos...
  seederProducts().then(() => {
    //validar si hay existencias

   });
   
  //guardar posibles cotizaciones

  if (responseProcessEmail.status) {
    res
      .status(200)
      .json({ message: "RFQ processed successfully", client, products });
  } else {
    res.status(500).json({ message: "Error processing RFQs" });
  }
};
