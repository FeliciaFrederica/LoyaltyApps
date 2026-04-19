const express = require('express');

const userAuth = require('../../middlewares/user-middleware');
const usersController = require('./users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get user detail --> lihat profil + POINT + voucher yg dipunya
  route.get('/me', userAuth, usersController.getUser);

  // Change password
  route.put('/:id/change-password', userAuth, usersController.changePassword);

  // Liat memberships (nampilin level, ada hitung total transaksi)
  route.get('/memberships', userAuth, usersController.getMemberships);
};
