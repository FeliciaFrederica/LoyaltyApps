const vouchersService = require('./vouchers-service');

async function getVoucher(request, response, next) {
  try {
    const vouchers = await vouchersService.getAllVoucher();
    response.status(200).json(vouchers);
  } catch (error) {
    next(error);
  }
}

async function addVouchers(request, response, next) {
  try {
    const vouchersData = request.body;
    const newVouchers = await vouchersService.createVoucher(vouchersData);
    response.status(201).json(newVouchers);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getVoucher,
  addVouchers,
};