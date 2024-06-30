import Product from '../models/Product';
import { entities } from '../utils/training/entities';
import sequelize from '../connection';

export async function createProduct(data: { quantity: number, price: number, product: string }) {
  return await Product.create(data);
}

export async function seederProducts() {
  const products = entities.filter(item => item[0] === "item")
  
  const transaction = await sequelize.transaction();
  try {
    const promises = products.map(data =>
      Product.findOrCreate({ where: { product: data[1] }, defaults: {
        quantity: Math.floor(Math.random() * 1000) + 1,
        price: Math.floor(Math.random() * 1000) + 1,
      }, transaction })
    );
    await Promise.all(promises);
    await transaction.commit(); 
  } catch (error) {
    await transaction.rollback(); 
    console.error('Error al insertar o encontrar datos:', error);
  }

}

export async function getAllProducts() {
  return await Product.findAll();
}

export async function getProductByName(name: string){
  return await Product.findOne({ where : {
    product: name
  }})
}

export async function updateProduct(product: string, data: { price?: number, quantity?: number }) {
  return await Product.update(data, {
    where: { product }
  });
}

export async function deleteProduct(product: string) {
  return await Product.destroy({
    where: { product }
  });
}
