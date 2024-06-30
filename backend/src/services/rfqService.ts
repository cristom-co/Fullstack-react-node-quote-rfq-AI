import { entities } from "../utils/training/entities";
import sequelize from "../connection";

import Product from "../models/Product";
import Quote from "../models/Qoute";


export async function seederProducts() {
  const products = entities.filter((item) => item[0] === "item");

  const transaction = await sequelize.transaction();
  try {
    const promises = products.map((data) =>
      Product.findOrCreate({
        where: { product: data[1] },
        defaults: {
          quantity: Math.floor(Math.random() * 1000) + 1,
          price: Math.floor(Math.random() * 1000) + 1,
        },
        transaction,
      })
    );
    await Promise.all(promises);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error al insertar o encontrar datos:", error);
  }
}

export async function findProductIfExist(products: any) {
  const transaction = await sequelize.transaction();
  try {
    const promises = products.map( async (product: any) => {

      const result = await Product.findOne({
        where: {
          product: product.item,
        },
        transaction,
      })
      if (result) {
        const totalPrice = result.price * product.quantity;
        return { ...product, price: result.price, totalPrice };
      } else {
        return null;
      }
    }
    );
    const response = await Promise.all(promises);
    await transaction.commit();

    return response;
  } catch (error) {
    await transaction.rollback();
    console.error("Error al insertar o encontrar datos:", error);
    return [];
  }
}

export async function createQoute(client: any, products: any) {

  let total = 0;
  for (const item of products) {
    total += item.totalPrice;
  }

  return await Quote.create({
    client: client.name,
    email: client.email,
    phoneNumber: client.phonenumber,
    deliveryLocation: client.delivery_location,
    deliveryDate: client.daterange,
    products: JSON.stringify(products),
    total
  })
}

export async function getAllQuotes(){
  return await Quote.findAll();
}