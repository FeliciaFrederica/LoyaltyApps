const transactionsRepository = require('./transactions-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');
const userService = require('../users/users-service');
const voucherService = require('../vouchers/vouchers-service');
const userRepository = require('../users/users-repository');

async function earnPoint(userId) {
  const earnedPoints = 100;
  await userService.addPoints(userId, earnedPoints); 
  return transactionsRepository.createTransaction({
    userId,
    type: "earn",
    points: earnedPoints,
    date: new Date()
  });
}

async function redeemVouchers(userId, voucherId) {
  const user = await userService.getUser(userId);
  const voucher = await voucherService.getVoucherById(voucherId);
  if (!voucher){ 
    throw errorResponder(errorTypes.NOT_FOUND, "Voucher tidak ditemukan");
  }
  if (voucher.expiredAt && voucher.expiredAt < new Date()) {
    throw errorResponder(errorTypes.BAD_REQUEST, "Voucher sudah expired");
  }
  if (voucher.quota <= 0) {
    throw errorResponder(errorTypes.BAD_REQUEST, "Voucher tidak tersedia");
  }
  if (user.points < voucher.pointsRequired) {
    throw errorResponder(errorTypes.BAD_REQUEST, "Points tidak mencukupi");
  }
  await userService.subtractPoints(userId, voucher.pointsRequired);
  await voucherService.decreaseQuota(voucherId);
  return transactionsRepository.createTransaction({
    userId,
    type: "redeem",
    points: voucher.pointsRequired,
    voucherId,
    date: new Date()
  }); 
}

async function orderProducts(userId, productId, quantity) {
  const product = await transactionsRepository.getProductById(productId);
  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Product not found');
  }
  const user = await userService.getUser(userId);
  let discount = 0;
  if (user.membershipTier === 'Platinum') {
    discount = 0.1; 
  } else if (user.membershipTier === 'Gold') {
    discount = 0.05;
  }

  const totalPrice = product.price * quantity * (1 - discount);

  const pointsMultiplier = user.membershipTier === 'Platinum' ? 2 : 1;
  const pointsEarned = Math.floor(totalPrice / 30000) * pointsMultiplier;

  const transaction = await transactionsRepository.createTransaction({
    userId, 
    productId, 
    quantity, 
    totalPrice, 
    pointsEarned,
    date: new Date()
  });

  const newTotalSpend = (user.totalSpend || 0) + totalPrice;
  const newPoints = (user.points || 0) + pointsEarned;

  let newTier = 'Silver';
  if (newTotalSpend >= 800000) {
    newTier = 'Platinum';
  } else if (newTotalSpend >= 300000) {
    newTier = 'Gold';
  }

  await userRepository.updateUser(userId, {
    points: newPoints,
    totalSpend: newTotalSpend,
    membershipTier: newTier
  });

  return {
    message: 'Order success!',
    detail: transaction,
    newTier: newTier
}
}

async function getTransactionHistory(userId) {
  const history = await transactionsRepository.getTransactionHistory(userId);
  if (!history || history.length === 0) {
    throw errorResponder(
      errorTypes.NOT_FOUND,
      'Transaction history not found for user'
    );
  }
  return history;
}

async function getVoucherById(id){
  return transactionsRepository.getVoucherById(id);
}

module.exports = {
  earnPoint,
  redeemVouchers,
  orderProducts,
  getTransactionHistory,
  getVoucherById
};