const express = require('express');

const transactionsController = require('./transactions-controller');
const userAuth = require('../../middleware/user-auth');

const route = express.Router();

module.exports = (app) => {
  app.use('/transactions', userAuth, route);

  // Add a new point
  route.post('/earn', transactionsController.earnPoint);

  // redeem, bayar pake points, ambil dari voucher
  route.post('/redeem', transactionsController.redeemVouchers);

  // order, beli pakai rp, ambil dari product, bisa dapet points
  route.post('/order', transactionsController.orderProducts);

  // Transaction History
  route.get('/me', transactionsController.getTransactionHistory);
};
