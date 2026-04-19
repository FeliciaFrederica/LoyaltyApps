const { Users, Transactions } = require('../../../models');
const { ObjectId } = require('mongoose').Types;

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
  const result = await Transactions.aggregate([
    {
      $match: {
        user_id: new ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$totalPrice' },
      },
    },
  ]);
  //ga ada transaksi, kembalikan 0
  return result.length > 0 ? result[0].total : 0;
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
