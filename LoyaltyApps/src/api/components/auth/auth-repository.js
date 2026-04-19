const { Users } = require('../../../models');

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(data) {
  return Users.create(data);
}

module.exports = { getUserByEmail, createUser };
