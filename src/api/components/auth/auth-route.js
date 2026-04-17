const express = require('express');

const authController = require('./auth-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/register', authController.registerUser);

  route.post('/login', authController.loginUser);
};
