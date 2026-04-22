const transactionsService = require('./transactions-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function earnPoint(request, response, next) {
  try {
    const userId = request.user.id;
    const result = await transactionsService.earnPoint(userId);
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function redeemVouchers(request, response, next) {
  try {
    const userId = request.user.id;
    const { voucherId } = request.body;

    const result = await transactionsService.redeemVouchers(userId, voucherId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function orderProducts(request, response, next) {
  try {
    const userId = request.user.id;
    const { productId, quantity } = request.body;

    if (!productId || !quantity) {
      return next(
        errorResponder(
          errorTypes.VALIDATION_ERROR,
          'ID Produk dan kuantitas wajib diisi!'
        )
      );
    }

    const orderResult = await transactionsService.orderProducts(
      userId,
      productId,
      quantity
    );
    return response.status(201).json(orderResult);
  } catch (error) {
    return next(error);
  }
}

async function getTransactionHistory(request, response, next) {
  try {
    const userId = request.user.id;
    const history = await transactionsService.getTransactionHistory(userId);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  earnPoint,
  redeemVouchers,
  orderProducts,
  getTransactionHistory,
};
