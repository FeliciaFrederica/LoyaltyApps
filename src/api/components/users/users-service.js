const usersRepository = require('./users-repository');
const vouchersRepository = require('../vouchers/vouchers-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getUser(id) {
  const [user, vouchers] = await Promise.all([
    usersRepository.getUser(id),
    vouchersRepository.getVouchersByUserId(id),
  ]);

  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Pengguna tidak ditemukan');
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    points: user.points || 0,
    vouchers: vouchers || [],
  };
}

async function getUserWithPassword(id) {
  const user = await usersRepository.getUserWithPassword(id);
  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Pengguna tidak ditemukan');
  }
  return user;
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function changePassword(id, hashedPassword) {
  return usersRepository.changePassword(id, hashedPassword);
}

async function addSaldo(id, amount) {
  if (typeof amount !== 'number' || amount <= 0) {
    throw errorResponder(
      errorTypes.UNPROCESSABLE_ENTITY,
      'Jumlah saldo harus positif'
    );
  }

  return usersRepository.addSaldo(id, amount);
}

async function getUserMembershipData(id) {
  const [user, totalSpent] = await Promise.all([
    usersRepository.getUser(id),
    usersRepository.getTotalSpent(id),
  ]);

  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Data pengguna tidak ditemukan');
  }

  return {
    user,
    totalSpent: totalSpent || 0,
  };
}

module.exports = {
  getUser,
  getUserWithPassword,
  emailExists,
  createUser,
  updateUser,
  changePassword,
  getUserMembershipData,
};
