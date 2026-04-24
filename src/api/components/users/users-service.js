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
    fullName: user.fullName || user.name,
    points: user.points || 0,
    saldo: user.saldo || 0,
    vouchers: vouchers || [],
    membershipTier: user.membershipTier,
    totalSpend: user.totalSpend || 0,
  };
}

async function getVoucherById(voucherId) {
  return VoucherModel.findbyId(voucherId);
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

async function addPoints(userId, points) {
  const user = await usersRepository.getUser(userId);
  user.points += points;
  return user.save();
}

async function subtractPoints(userId, points) {
  const user = await usersRepository.getUser(userId);

  if (user.points < points) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Point tidak mencukupi');
  }

  user.points -= points;
  return user.save();
}

async function changePassword(id, hashedPassword) {
  return usersRepository.changePassword(id, hashedPassword);
}

async function addSaldo(id, amount) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    throw errorResponder(
      errorTypes.UNPROCESSABLE_ENTITY,
      'Jumlah saldo harus berupa angka positif'
    );
  }

  const user = await usersRepository.getUser(id);
  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Pengguna tidak ditemukan');
  }

  const updatedUser = await usersRepository.addSaldo(id, numericAmount);

  return {
    message: 'Saldo berhasil ditambahkan',
    userId: updatedUser.id,
    fullName: updatedUser.fullName,
    currentSaldo: updatedUser.saldo,
  };
}

async function getUserMembershipData(id) {
  const [user, totalSpent] = await Promise.all([
    getUser(id),
    usersRepository.getTotalSpent(id),
  ]);

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
  addPoints,
  subtractPoints,
  changePassword,
  getUserMembershipData,
  addSaldo,
};
