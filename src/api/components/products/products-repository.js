const { Products } = require('../../../models');

async function getProducts() {
  return Products.find();
}

<<<<<<< HEAD
async function getProductByName(name){
  return Products.find({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
=======
async function findByName(name) {
  return Products.findOne({ name: name }); 
>>>>>>> df798bc469621028543fc096bfbc0e33e5f33584
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
  getProductByName,
=======
  findByName,
>>>>>>> df798bc469621028543fc096bfbc0e33e5f33584
  createProducts,
  updateProducts,
  deleteProducts,
};
