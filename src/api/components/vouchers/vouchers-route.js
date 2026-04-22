const express = require('express');
const vouchersController = require('./vouchers-controller');
const userAuth = require('../../middlewares/user-middleware');
const adminOnly = require('../../middlewares/admin-middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/products/vouchers', route);

  // melihat voucher yang tersedia
  route.get('/', userAuth, vouchersController.getVouchers);

  // upload voucher (admin)
  route.post('/', userAuth, adminOnly, vouchersController.addVouchers);

};
