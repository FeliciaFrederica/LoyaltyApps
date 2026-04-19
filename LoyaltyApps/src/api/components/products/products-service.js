const productsRepository = require ('./products-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllProducts() {
  return Promise.resolve(productsData);
}

// async function createProducts(data) {
//   const newProduct = {
//     id: productsData.length + 1,
//   };
//   productsData.push(newProduct);
//   return Promise.resolve(newProduct);
// }

async function createProducts(data) {
  const { name, price, stock, description } = data;
  return await productsRepository.createProducts(name, price, stock, description);
}

module.exports = {
  getAllProducts,
  createProducts
};