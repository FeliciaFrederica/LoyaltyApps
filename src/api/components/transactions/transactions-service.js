const transactionsRepository = require('./transactions-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

// async function earnPoint(request, response, next) {
//   //  todo
// }

// async function redeemVouchers(request, response, next) {
//   // todo
// }

async function orderProducts(userId, productId, quantity) {
  // cek kuantitas
  if (quantity <= 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Kuantitas minimal 1 produk'
    );
  }

  // cek produk
  const product = await transactionsRepository.getProductById(productId);
  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Produk tidak ditemukan.');
  }

  // cek stok
  if (product.stock < quantity) {
    throw errorResponder(errorTypes.VALIDATION_ERROR, 'Maaf, stok habis.');
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

  const userBalance = user.balance || 0;
  if (userBalance < totalPrice) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      `Saldo tidak cukup. Total belanja Rp ${totalPrice.toLocaleString()}. Saldo Anda hanya Rp Rp ${userBalance.toLocaleString()}}.`
    );
  }

  // perhitungan poin (Rp30.000/poin, khusus Platinum poin didapat 2x lipat)
  const pointsMultiplier = user.membershipTier === 'Platinum' ? 2 : 1;
  const pointsEarned = Math.floor(totalPrice / 30000) * pointsMultiplier;

  // simpan transaksi
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
  const newBalance = userBalance - totalPrice;
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
  user.balance = newBalance;
  user.points = newPoints;
  user.totalSpend = newTotalSpend;
  user.membershipTier = newTier;

  await user.save();

  return {
    message: 'Order berhasil!',
    balanceLeft: newBalance,
    pointsEarned,
    newTier,
    detail: transaction,
  };
}

async function getTransactionHistory(userId) {
  const history = await transactionsRepository.getTransactionHistory(userId);
  if (!history || history.length === 0) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Transaction history is empty');
  }
  return history;
}

module.exports = {
  // earnPoint,
  // redeemVouchers,
  orderProducts,
  getTransactionHistory,
};
