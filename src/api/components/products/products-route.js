const express = require('express');
const productsController = require('./products-controller');
const adminOnly = require('../../middlewares/admin-middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  // Melihat product yang tersedia
  route.get('/', productsController.getProducts);

  // Menambahkan product
  route.post('/', adminOnly, productsController.addProducts);

  // Mengupdate product
  route.put('/:id', adminOnly, productsController.updateProduct);

  // Menghapus product
  // route.delete('/:id', userAuth, adminOnly, productsController.deleteProducts);
};
