const express = require('express');

const productsController = require('./products-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  // Get a list of products
  route.get('/', productsController.getProducts);
};
