const express = require('express');

const vouchersController = require('./vouchers-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/vouchers', route);

  // melihat voucher
  route.get('/vouchers', vouchersController.getVouchers);

  // upload voucher (admin)
  route.post('/vouchers', vouchersController.addVouchers);
};
