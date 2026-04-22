const express = require('express');
const userAuth = require('../../middlewares/user-middleware');
const usersController = require('./users-controller');

module.exports = (app) => {
  const route = express.Router();
  app.use('/users', route);

  // Lihat profil
  route.get('/me', userAuth, usersController.getUser);

  // Change password
  route.put('/me/change-password', userAuth, usersController.changePassword);

  // Liat memberships
  route.get('/memberships', userAuth, usersController.getMemberships);

  route.post('/saldo', userAuth, usersController.addSaldo);
};
