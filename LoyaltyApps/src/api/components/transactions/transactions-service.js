const transactionsService = require('./transactions-service');
const transactionsRepository = require('./transactions-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function earnPoint(request, response, next) {
  //  todo
}

async function redeemVouchers(request, response, next) {
  // todo
}

async function orderProducts(userId, productId, quantity) {
  const product = await transactionsRepository.getProductById(productId);
  if (!product) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Product not found');
  }

  const userPoints = await transactionsRepository.getUserPoints(userId);
  
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
  if (!history) {
    throw errorResponder(
      errorTypes.NOT_FOUND,
      'Transaction history not found for user'
    );
  }
  return history;
}