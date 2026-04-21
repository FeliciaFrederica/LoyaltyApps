const express = require('express');
const userAuth = require('../../middlewares/user-middleware');
const usersController = require('./users-controller');

module.exports = (app) => {
  const route = express.Router();
  app.use('/users', route);

  // Lihat profil, poin, voucher yg dipunya
  route.get('/me', userAuth, usersController.getUser);

  // Change password
  route.put('/me/change-password', userAuth, usersController.changePassword);

  // Liat memberships (nampilin level, ada hitung total transaksi)
  route.get('/memberships', userAuth, usersController.getMemberships);

  // Tambah Saldo (Top-up)
  route.post('/saldo', userAuth, usersController.addSaldo);
};
