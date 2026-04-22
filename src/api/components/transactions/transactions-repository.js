const { Transactions, Users, Products, Vouchers } = require('../../../models');

async function createTransaction(data) {
  return Transactions.create(data);
}

async function getTransactionHistory(userId) {
  return Transactions.find({ userId }).populate('productId').sort({ date: -1 });
}

async function getVoucherById(id) {
  return Vouchers.findById(id);
}

async function getProductById(id) {
  return Products.findById(id);
}

async function getUserById(id) {
  return Users.findById(id);
}

module.exports = {
  createTransaction,
  getTransactionHistory,
  getVoucherById,
  getProductById,
  getUserById,
};
