const transactionsService = require('./transactions-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function earnPoint(request, response, next) {
  try {
    const {id} = request.user;
    const {points, productId} = request.body;
    const result = await transactionsService.createTransaction({
      userId: id,
      productId,
      type: 'earn',
      points
    });
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function redeemVouchers(request, response, next) {
  try {
    const {id} = request.user;
    const {points, productId} = request.body;
    const result = await transactionsService.createTransaction({
      userId: id,
      productId,
      type: 'redeem',
      points
    });
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function orderProducts(request, response, next) {
  try {
    const { id } = request.user;
    const { productId, quantity } = request.body;
    const orderResult = await transactionsService.orderProducts(
      id,
      productId,
      quantity
    );
    return response.status(200).json(orderResult);
  } catch (error) {
    next(error);
  }
}

async function getTransactionHistory(request, response, next) {
  try {
    const { userId } = request.user;
    const history = await transactionsService.getTransactionHistory(userId);
    return response.status(200).json(history);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  earnPoint,
  redeemVouchers,
  orderProducts,
  getTransactionHistory
};