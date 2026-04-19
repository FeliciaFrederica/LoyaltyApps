const express = require('express');
const vouchersController = require('./vouchers-controller');
const { userAuth, adminOnly } = require('../middlewares/auth-middleware');

const route = express.Router();

module.exports = (app) => {
  app.use('/products/vouchers', route);

  // melihat voucher yang tersedia
  route.get('/', userAuth, vouchersController.getVouchers);

  // upload voucher (admin)
  route.post('/', userAuth, adminOnly, vouchersController.addVouchers);

};
