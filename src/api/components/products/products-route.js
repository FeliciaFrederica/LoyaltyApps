const express = require('express');
const productsController = require('./products-controller');
const adminOnly = require('../../middlewares/auth-middleware');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  // Melihat product yang tersedia
  route.get('/', productsController.getProducts);

  // Menambahkan product
  route.post('/', userAuth, adminOnly, productsController.addProducts);

  // Mengupdate product
  route.put('/:id', userAuth, adminOnly, productsController.updateProduct);

  // Menghapus product
  route.delete('/:id', userAuth, adminOnly, productsController.deleteProduct);
};

