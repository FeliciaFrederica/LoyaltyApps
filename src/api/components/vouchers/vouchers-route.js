const express = require('express');
const vouchersController = require('./vouchers-controller');
const { userAuth, adminOnly } = require('../middlewares/auth-middleware');

const route = express.Router();

module.exports = (app) => {
  app.use('/vouchers', route);

  // melihat voucher
  route.get('/', vouchersController.getVouchers);

  // upload voucher (admin)
  route.post('/', vouchersController.addVouchers);
};