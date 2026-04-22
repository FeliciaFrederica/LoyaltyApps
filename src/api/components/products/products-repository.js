const { Products } = require('../../../models');

async function getProducts() {
  return Products.find();
}

<<<<<<< HEAD
<<<<<<< HEAD
async function getProductByName(name){
  return Products.find({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
=======
async function findByName(name) {
  return Products.findOne({ name: name }); 
>>>>>>> df798bc469621028543fc096bfbc0e33e5f33584
=======
async function findByName(name) {
  return Products.findOne({ name: name }); 
>>>>>>> 77df24c0ed263ec049903d9da0f2935e45d6dc5d
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
<<<<<<< HEAD
<<<<<<< HEAD
  getProductByName,
=======
  findByName,
>>>>>>> df798bc469621028543fc096bfbc0e33e5f33584
=======
  findByName,
>>>>>>> 77df24c0ed263ec049903d9da0f2935e45d6dc5d
  createProducts,
  updateProducts,
  deleteProducts,
};
