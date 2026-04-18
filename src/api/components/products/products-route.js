const express = require('express');
const productsController = require('./products-controller');
const { userAuth, adminOnly } = require('../middlewares/auth-middleware');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  // Melihat product yang tersedia
  route.get('/', productsController.getProducts);

  // Menambahkan product
  route.post('/', productsController.addProducts);
};