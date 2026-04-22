const { Vouchers } = require('../../../models');

async function getVouchers() {
  return Vouchers.find();
}

async function getVouchersByCode(code) {
  return Vouchers.findOne({ code });
}

async function getVouchersByUserId(userId) {
  return Vouchers.findOne({ userId });
}

async function createVouchers(code, discount, quota, expiredAt) {
  return Vouchers.create({ code, discount, quota, expiredAt });
}

async function updateVouchers(id, code, discount, quota, expiredAt) {
  return Vouchers.updateOne(
    { _id: id },
    { $set: { code, discount, quota, expiredAt } }
  );
}

async function deleteVouchers(id) {
  return Vouchers.deleteOne({ _id: id });
}

module.exports = {
  getVouchers,
  getVouchersByCode,
  getVouchersByUserId,
  createVouchers,
  updateVouchers,
  deleteVouchers,
};
