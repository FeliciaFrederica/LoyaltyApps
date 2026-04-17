const usersRepository = require('./users-repository');
const vouchersRepository = require('../vouchers/vouchers-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getUser(id) {
  const [user, vouchers] = await Promise.all([
    usersRepository.getUser(id),
    vouchersRepository.getVouchersByUserId(id),
  ]);

  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'User not found');
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    points: user.points || 0,
    vouchers: vouchers || [],
  };
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

module.exports = {
  getUser,
  emailExists,
  createUser,
  updateUser,
};
