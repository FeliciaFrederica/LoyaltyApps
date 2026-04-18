const vouchersService = require('./vouchers-service');

async function getVouchers(request, response, next) {
  try {
    const vouchers = await vouchersService.getAllVouchers();
    response.status(200).json({
      success: true,
      data: vouchers
    });
  } catch (error) {
    next(error);
  }
}

async function addVouchers(request, response, next) {
  try {
    const vouchersData = request.body;
    const newVouchers = await vouchersService.createVouchers(vouchersData);
    response.status(201).json({
      success: true,
      message: 'Voucher berhasil diupload',
      data: newVouchers
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getVouchers,
  addVouchers
};