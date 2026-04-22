const transactionsRepository = require('./transactions-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');
const userService = require('../users/users-service');
const voucherService = require('../vouchers/vouchers-service');

async function earnPoint(userId) {
  const earnedPoints = 100;

  await userService.addPoints(userId, earnedPoints);

  return transactionsRepository.createTransaction({
    userId,
    type: 'earn',
    points: earnedPoints,
    date: new Date(),
  });
}

async function redeemVouchers(userId, voucherId) {
  const user = await userService.getUser(userId);
  const voucher = await voucherService.getVoucherById(voucherId);

  if (!voucher) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Voucher tidak ditemukan');
  }

  if (voucher.expiredAt && voucher.expiredAt < new Date()) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Voucher sudah expired');
  }

  if (voucher.quota <= 0) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Voucher tidak tersedia');
  }

  if (user.points < voucher.pointsRequired) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Points tidak mencukupi');
  }

  await userService.subtractPoints(userId, voucher.pointsRequired);
  await voucherService.decreaseQuota(voucherId);

  return transactionsRepository.createTransaction({
    userId,
    type: 'redeem',
    points: voucher.pointsRequired,
    voucherId,
    date: new Date(),
  });
}

async function orderProducts(userId, productId, quantity) {
  if (quantity <= 0) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Kuantitas minimal 1 produk');
  }

  const product = await transactionsRepository.getProductById(productId);
  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Produk tidak ditemukan.');
  }

  if (product.stock < quantity) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Maaf, stok habis.');
  }

  // cek user
  const user = await transactionsRepository.getUserById(userId);
  if (!user) {
    throw errorResponder(errorTypes.NOT_FOUND, 'User tidak ditemukan');
  }

  // logic diskon berdasarkan membership tier
  let discount = 0;
  if (user.membershipTier === 'Platinum') {
    discount = 0.1;
  } else if (user.membershipTier === 'Gold') {
    discount = 0.05;
  }

  const totalPrice = product.price * quantity * (1 - discount);

  const userSaldo = user.saldo || 0;
  if (userSaldo < totalPrice) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      `Saldo tidak cukup. Total belanja Rp ${totalPrice.toLocaleString()}. Saldo Anda hanya Rp ${userSaldo.toLocaleString()}.`
    );
  }

  // perhitungan poin (Rp30.000/poin, khusus Platinum poin didapat 2x lipat)
  const pointsMultiplier = user.membershipTier === 'Platinum' ? 2 : 1;
  const pointsEarned = Math.floor(totalPrice / 30000) * pointsMultiplier;

  const transaction = await transactionsRepository.createTransaction({
    userId,
    productId,
    quantity,
    totalPrice,
    points: pointsEarned,
    type: 'order',
    date: new Date(),
  });

  // update data user
  const newSaldo = userSaldo - totalPrice;
  const newTotalSpend = (user.totalSpend || 0) + totalPrice;
  const newPoints = (user.points || 0) + pointsEarned;

  let newTier = 'Silver';
  if (newTotalSpend >= 800000) {
    newTier = 'Platinum';
  } else if (newTotalSpend >= 300000) {
    newTier = 'Gold';
  }

  // pengurangan stok
  product.stock -= quantity;
  await product.save();

  // update user data
  user.saldo = newSaldo;
  user.points = newPoints;
  user.totalSpend = newTotalSpend;
  user.membershipTier = newTier;

  await user.save();

  return {
    message: 'Order berhasil!',
    saldoLeft: newSaldo,
    pointsEarned,
    newTier,
    detail: transaction,
  };
}

async function getTransactionHistory(userId) {
  const history = await transactionsRepository.getTransactionHistory(userId);

  if (!history || history.length === 0) {
    throw errorResponder(
      errorTypes.NOT_FOUND,
      'Histori transkasi tidak ditemukan.'
    );
  }

  return history;
}

module.exports = {
  earnPoint,
  redeemVouchers,
  orderProducts,
  getTransactionHistory,
};
