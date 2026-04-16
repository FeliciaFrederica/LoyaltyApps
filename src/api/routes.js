const express = require('express');

const auth = require('./components/auth/auth-route');
const dashboards = require('./components/dashboards/dashboards-route');
const membership = require('./components/membership/membership-route');
const news = require('./components/news/news-route');
const points = require('./components/points/points-route');
const products = require('./components/products/products-route');
const redeem = require('./components/redeem/redeem-route');
const rewards = require('./components/rewards/rewards-route');
const transactions = require('./components/transactions/transactions-route.js');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);

  return app;
};
