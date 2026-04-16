const express = require('express');

const productsController = require('./products-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/products', route);

  // Get a list of products
  route.get('/', transactionController.getProducts);

  // melihat voucher
  route.get('/vouchers', transactionController.getVoucher);

  // upload voucher (admin)
  route.post('/vouchers', transactionController.addVoucher);
};
