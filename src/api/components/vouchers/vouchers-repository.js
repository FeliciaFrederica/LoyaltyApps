const { Vouchers } = require('../../../models');

async function getVoucher() {
  return Vouchers.find();
}

async function getVoucherById(voucherId) {
  return Vouchers.findById(voucherId);
}

async function getVouchersByUserId(userId) {
  return [];
}

async function getVoucherByCode(code) {
  return Vouchers.findById({ code });
}

async function createVoucher(code, discount, quota, expiredAt) {
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
  getVoucher,
  getVoucherById,
  getVouchersByUserId,
  getVoucherByCode,
  createVoucher,
  updateVouchers,
  deleteVouchers,
};