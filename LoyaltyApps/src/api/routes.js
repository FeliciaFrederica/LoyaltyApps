const express = require('express');

const auth = require('./components/auth/auth-route');
const products = require('./components/products/products-route');
const transactions = require('./components/transactions/transactions-route');
const users = require('./components/users/users-route');
const vouchers = require('./components/vouchers/vouchers-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  products(app);
  transactions(app);
  users(app);
  vouchers(app);

  return app;
};
