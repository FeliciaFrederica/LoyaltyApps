const vouchersRepository = require('./vouchers-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllVouchers() {
  return await vouchersRepository.getVouchers();
}

async function getVoucherById(voucherId){
    return vouchersRepository.getVoucherById(voucherId);
}

async function createVouchers(data) {
  const { code, discount, quota, expiredAt } = data;

  // validasi apakah data sudah lengkap
  if (!code || !discount || quota === undefined || !expiredAt) {
    const error = new Error('Data tidak lengkap! Semua field wajib diisi.');
    error.status = 400;
    throw error;
  }

  // validasi jumlah quota voucher
  if (quota <= 0) {
    const error = new Error('Kuota voucher harus lebih dari 0.');
    error.status = 400;
    throw error;
  }

  // memeriksa apakah ada duplikasi voucher
  const existingVoucher = await vouchersRepository.getVoucherByCode(
    code.toUpperCase()
  );
  if (existingVoucher) {
    const error = new Error('Kode voucher sudah ada!');
    error.status = 409;
    throw error;
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

async function decreaseQuota(voucherId){
    const voucher = await vouchersRepository.getVoucherById(voucherId);
    if (!voucher || voucher.quota <= 0){
        throw new Error("Voucher tidak tersedia");
    }
    voucher.quota -= 1;
    return voucher.save();
}

module.exports = {
<<<<<<< HEAD
    getAllVouchers,
    createVouchers,
    decreaseQuota,
    getVoucherById
};
=======
  getAllVouchers,
  createVouchers,
};
>>>>>>> main
