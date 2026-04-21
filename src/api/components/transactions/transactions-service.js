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

  const minBalance = 1;
  if ((user.points || 0) < minBalance) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      `Minimal saldo Rupiah untuk melakukan transaksi adalah Rp ${product.price}.`
    );
  }

  // logic diskon berdasarkan membership tier
  let discount = 0;
  if (user.membershipTier === 'Platinum') {
    discount = 0.1;
  } else if (user.membershipTier === 'Gold') {
    discount = 0.05;
  }

  const totalPrice = product.price * quantity * (1 - discount);

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
    typr: 'order',
    date: new Date(),
  });

  // update membership user
  const newTotalSpend = (user.totalSpend || 0) + totalPrice;
  const newPoints = (user.points || 0) + pointsEarned;

  let newTier = 'Silver';
  if (newTotalSpend >= 800000) {
    newTier = 'Platinum';
  } else if (newTotalSpend >= 300000) {
    newTier = 'Gold';
  }

  // update user data
  user.points = newPoints;
  user.totalSpend = newTotalSpend;
  user.membershipTier = newTier;
  await user.save();

  return {
    message: 'Order berhasil!',
    detail: transaction,
    newTier,
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
