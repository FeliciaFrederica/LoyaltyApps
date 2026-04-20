const { Transactions, Products, Vouchers } = require('../../../models');

async function createTransaction(data) {
  return Transactions.create(data);
}

async function getTransactionHistory(userId) {
<<<<<<< HEAD
  return Transactions.find({userId}).sort({date: -1});
}

async function getVoucherById(id) {
  return Vouchers.findById(id);
=======
  return Transactions.find({ userId }).populate('productId').sort({ date: -1 });
>>>>>>> main
}

async function getProductById(id) {
  return Products.findById(id);
<<<<<<< HEAD
=======
}

async function getUserById(id) {
  return Users.findById(id);
>>>>>>> main
}

module.exports = {
  createTransaction,
  getTransactionHistory,
<<<<<<< HEAD
  getVoucherById,
  getProductById
};
=======
  getProductById,
  getUserById,
};
>>>>>>> main
