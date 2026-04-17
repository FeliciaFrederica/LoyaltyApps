const { Users } = require('../../../models');

async function getUser(id) {
  return Users.findById(id).select('email fullName points vouchers');
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

module.exports = {
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
};
