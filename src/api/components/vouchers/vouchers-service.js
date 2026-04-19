const vouchersRepository = require ('./vouchers-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllVouchers() {
    return Promise.resolve(vouchersData);
}

async function getVoucherById(voucherId){
    return vouchersRepository.getVoucherById(voucherId);
}

async function createVouchers(data) {
    const newVouchers = {
        id: vouchersData.length + 1,
    };
    vouchersData.push(newVouchers);
    return Promise.resolve(newVouchers);
}

async function decreaseQuota(voucherId){
    const voucher = await vouchersRepository.getVoucherById(voucherId);
    if (!voucher || voucher.quota <= 0){
        throw new Error("Voucher tidak tersedia");
    }
    voucher.quota -= 1;
    return voucher.save();
}

module.exports = {
    getAllVouchers,
    createVouchers,
    decreaseQuota,
    getVoucherById
};