const { Users, Transactions } = require('../../../models');

async function getUser(id) {
  return Users.findById(id).select('email fullName points vouchers');
}

async function getUserWithPassword(id) {
  return Users.findById(id).select('password');
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, fullName) {
  return Users.create({ email, password, fullName });
}

async function updateUser(id, email, fullName) {
  return Users.updateOne({ _id: id }, { $set: { email, fullName } });
}

async function changePassword(id, password) {
  return Users.updateOne({ _id: id }, { $set: { password } });
}

async function getTotalSpent(userId) {
  // Mencari semua transaksi milik user
  const transactions = await Transactions.find({ userId: userId });
  return transactions.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
}

module.exports = {
  getUser,
  getUserWithPassword,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  getTotalSpent,
};
