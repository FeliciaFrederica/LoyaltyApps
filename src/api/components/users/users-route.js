const express = require('express');

const usersController = require('./users-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Create a new user --> register
  route.post('/', usersController.createUser);

  // Login endpoint
  route.post('/login', usersController.loginUser);

  // Get user detail --> lihat profil + POINT + voucher yg dipunya
  route.get('/:id', usersController.getUser);

  // Change password
  route.put('/:id/change-password', usersController.changePassword);

  // Liat memberships (nampilin level, ada hitung total transaksi)
  route.get('/memberships', usersController.getMemberships);
};
