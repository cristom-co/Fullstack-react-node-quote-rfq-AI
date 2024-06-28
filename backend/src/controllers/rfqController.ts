import { Request, Response } from "express";
import { processEmail } from "../utils/aiUtils";
import { extractClientName } from "../utils/rfqUtils";

export const handleRfq = async (req: Request, res: Response) => {
  const { body } = req.body;

  const responseProcessEmail = await processEmail(body);

  const email = responseProcessEmail.entities.find(
    (entity: any) => entity.entity === "email"
  )?.resolution.value;

  const phonenumber = responseProcessEmail.entities.find(
    (entity: any) => entity.entity === "phonenumber"
  )?.resolution.value;

  const delivery_location = responseProcessEmail.entities.find(
    (entity: any) => entity.entity === "delivery_location"
  )?.option;

  const daterange = responseProcessEmail.entities.find(
    (entity: any) => entity.entity === "daterange"
  )?.resolution.timex;

  let products: any = [];
  let client = {
    name: extractClientName(body),
    email,
    phonenumber,
    delivery_location,
    daterange,
  };

  const validateEntityProduct = (scopeEntity: any) => {
    switch (scopeEntity.entity) {
      case "number":
        return scopeEntity.resolution.value;
      default:
        return scopeEntity.option;
    }
  };

  const getTypeNumber = (value: number) => {
    let typeEntity = "none";
    //max 1000 items
    if (value > 0 && value < 1000) {
      typeEntity = "quantity";
    }
    if (typeEntity === "none") {
      return;
    }
    return {
      typeEntity,
      value,
    };
  };

  responseProcessEmail.entities
    .filter((item: any) => item.entity !== "number")
    .map((entity: any) => {
      if (entity.alias) {
        const tmp = entity.alias.split("_");
        products[tmp[1]] = {
          ...products[tmp[1]],
          [entity.entity]: validateEntityProduct(entity),
        };
      } else {
        if (!Object.keys(client).includes(entity.entity)) {
          products[0] = {
            ...products[0],
            [entity.entity]: validateEntityProduct(entity),
          };
        }
      }
    });

  responseProcessEmail.entities
    .filter((item: any) => (item.entity === "number" && item.sourceText.length !== 12))
    .map((entity: any, index: number) => {
      let typeNumber = getTypeNumber(entity.resolution.value)
      if(typeNumber){
        products[index] = {...products[index], [typeNumber.typeEntity]: entity.resolution.value}
      }
    });

  if (responseProcessEmail.status) {
    res.status(200).json({ message: "RFQ processed successfully", client, products });
  } else {
    res.status(500).json({ message: "Error processing RFQs" });
  }
};
