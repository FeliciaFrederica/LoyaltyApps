const transactionsService = require('./transactions-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function earnPoint(request, response, next) {
  try {
    const userId = request.user.id;
    const user = await userService.getUser(userId);
    const earnedPoints = 100;
    user.points += earnedPoints;
    await user.save();
    const result = await transactionsService.createTransaction({
      userId,
      type: "earn",
      points: earnedPoints
    });
    return response.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function redeemVouchers(request, response, next) {
  try {
    const userId = request.user.id;
    const {voucherId} = request.body;
    const user = await userService.getUser(userId);
    const voucher = await transactionsService.getVoucherById(voucherId);
    if (!voucher) {
      return response.status(404).json({message: "Voucher not found"});
    }
    if (voucher.expiredAt && voucher.expiredAt < new Date()) {
      return response.status(400).json({message: "Voucher expired"});
    }
    if (voucher.quota <= 0) {
      return response.status(400).json({message: "Voucher not available"});
    }
    if (user.points < voucher.pointsRequired) {
      return response.status(400).json({message: "Not enough points"});
    }
    user.points -= voucher.pointsRequired;
    voucher.quota -= 1;
    await user.save();
    await voucher.save();
    const result = await transactionsService.createTransaction({
      userId,
      type: "redeem",
      points: voucher.pointsRequired,
      voucherId
    });
    return response.status(200).json(result);
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
    const userId = request.user.id;
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