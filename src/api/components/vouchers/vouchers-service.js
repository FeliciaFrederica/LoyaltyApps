const vouchersRepository = require('./vouchers-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllVouchers() {
  return await vouchersRepository.getVouchers();
}

async function getVoucherById(voucherId) {
  return vouchersRepository.getVoucherById(voucherId);
}

async function createVouchers(data) {
  const { code, discount, quota, expiredAt } = data;

  if (!code || !discount || quota === undefined || !expiredAt) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'Data tidak lengkap! Semua field wajib diisi.'
    );
  }

  if (quota <= 0) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'Kuota voucher harus lebih dari 0.'
    );
  }

  const existingVoucher = await vouchersRepository.getVoucherByCode(
    code.toUpperCase()
  );

  if (existingVoucher) {
    throw errorResponder(
      errorTypes.CONFLICT,
      'Kode voucher sudah ada!'
    );
  }

  const newVoucher = await vouchersRepository.createVoucher(
    code.toUpperCase(),
    discount,
    quota,
    expiredAt
  );

  return {
    success: true,
    message: 'Voucher berhasil ditambahkan',
    data: newVoucher,
  };
}

async function decreaseQuota(voucherId) {
  const voucher = await vouchersRepository.getVoucherById(voucherId);

  if (!voucher || voucher.quota <= 0) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'Voucher tidak tersedia'
    );
  }

  voucher.quota -= 1;
  return voucher.save();
}

module.exports = {
  getAllVouchers,
  createVouchers,
  decreaseQuota,
  getVoucherById,
};