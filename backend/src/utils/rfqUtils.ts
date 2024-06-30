export const extractClientName = (emailText: string) => {
  const regex =
    /Hi, my name is ([A-Z][a-z]+ [A-Z][a-z]+)|My name is ([A-Z][a-z]+ [A-Z][a-z]+)|I am ([A-Z][a-z]+ [A-Z][a-z]+)|This is ([A-Z][a-z]+ [A-Z][a-z]+)/i;
  const match = emailText.match(regex);
  if (match) {
    return match[1] || match[2] || match[3] || match[4];
  }
  return null;
};

export const validateEntityProduct = (entity: any) => {
  switch (entity.entity) {
    case "number":
      return entity.resolution.value;
    default:
      return entity.option;
  }
};

export const getTypeNumber = (value: number) => {
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

export const getClientEntities = (response: any, body: string) => {
  const email = response.entities.find(
    (entity: any) => entity.entity === "email"
  )?.resolution.value;

  const phonenumber = response.entities.find(
    (entity: any) => entity.entity === "phonenumber"
  )?.resolution.value;

  const delivery_location = response.entities.find(
    (entity: any) => entity.entity === "delivery_location"
  )?.option;

  const daterange = response.entities.find(
    (entity: any) => entity.entity === "daterange"
  )?.resolution.timex;

  return {
    name: extractClientName(body),
    email,
    phonenumber,
    delivery_location,
    daterange,
  };
};

export const getProductEntities = (entities: any, client: any) => {
  let products: any = [];
  entities
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
  //Only Numbers
  entities
    .filter(
      (item: any) => item.entity === "number" && item.sourceText.length !== 12
    )
    .map((entity: any, index: number) => {
      let typeNumber = getTypeNumber(entity.resolution.value);
      if (typeNumber) {
        products[index] = {
          ...products[index],
          [typeNumber.typeEntity]: entity.resolution.value,
        };
      }
    });

  return products;
};
