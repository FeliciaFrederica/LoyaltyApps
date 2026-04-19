const transactionsService = require('./transactions-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function earnPoint(request, response, next) {
  try {
    const { id } = request.user;
    const { points, productId } = request.body;
    const result = await transactionsService.createTransaction({
      userId: id,
      productId,
      type: 'earn',
      points,
    });
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function redeemVouchers(request, response, next) {
  try {
    const { id } = request.user;
    const { points, productId } = request.body;
    const result = await transactionsService.createTransaction({
      userId: id,
      productId,
      type: 'redeem',
      points,
    });
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function orderProducts(request, response, next) {
  try {
    const { id } = request.user;
    const { productId, quantity } = request.body;

    if (!productId || !quantity) {
      return next(
        errorResponder(
          errorTypes.VALIDATION_ERROR,
          'Product ID and Quantity are required!'
        )
      );
    }

    const orderResult = await transactionsService.orderProducts(
      id,
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
    const { id } = request.user;
    const history = await transactionsService.getTransactionHistory(id);
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
