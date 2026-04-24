const { Vouchers } = require('../../../models');

async function getVoucher() {
  return Vouchers.find();
}

async function getVoucherByCode(code) {
  return Vouchers.findOne({ code });
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
  getVoucherByCode,
  createVoucher,
  updateVouchers,
  deleteVouchers,
};