const { Products } = require('../../../models');

async function getProducts() {
  return Products.find();
}

async function getProductByName(name) {
  return Products.findOne({ name });
}

async function getProductById(id) {
  return Products.findById(id);
}

async function createProducts(name, price, stock, description) {
  return Products.create({ name, price, stock, description });
}

async function updateProducts(id, name, price, stock, description) {
  return Products.updateOne(
    { _id: id },
    { $set: { name, price, stock, description } }
  );
}

async function deleteProducts(id) {
  return Products.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  getProductByName,
  getProductById,
  createProducts,
  updateProducts,
  deleteProducts,
};
