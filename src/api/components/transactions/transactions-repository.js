const { Transactions, Products } = require('../../../models');

async function createTransaction(data) {
  return Transactions.create(data);
}

async function getTransactionHistory(userId) {
  return Transactions.findAll({
    where: { userId },
    include: [{ model: Products, as: 'product' }],
    order: [['date', 'DESC']]
  });
}

async function getVoucherById(id) {
  return Vouchers.findById(id);
}

module.exports = {
  createTransaction,
  getTransactionHistory,
  getProductById
};