import { Request, Response } from "express";
import { processEmail } from "../utils/aiUtils";

export const handleRfq = async (req: Request, res: Response) => {
  const { body } = req.body;

  const responseProcessEmail = await processEmail(body);

  let products: any = []
  let client =  {
    name: null,
    email: responseProcessEmail.entities.find((entity: any) => entity.entity === "email")?.resolution.value
  }

  responseProcessEmail.entities.map((entity: any) => {
      if(entity.alias){
        const tmp = entity.alias.split("_")
        products[tmp[1]] = {...products[tmp[1]], [entity.entity]: entity.entity === "number" ? entity.resolution.value : entity.option}
      }else{
        //solo un producto
      }
    })

  console.log(products, client)

  if (responseProcessEmail.status) {
    res.status(200).json({ message: "RFQ processed successfully" });
  } else {
    res.status(500).json({ message: "Error processing RFQs" });
  }
};
