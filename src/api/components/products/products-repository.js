const { Products } = require('../../../models'); 

async function getProducts() {
  return Products.find(); 
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
  createProducts,
  updateProducts,
  deleteProducts,
};