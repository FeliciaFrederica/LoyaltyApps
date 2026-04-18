const vouchersRepository = require ('./vouchers-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getAllVouchers() {
    return Promise.resolve(vouchersData);
}

async function createVouchers(data) {
    const newVouchers = {
        id: vouchersData.length + 1,
    };
    vouchersData.push(newVouchers);
    return Promise.resolve(newVouchers);
}

module.exports = {
    getAllVouchers,
    createVouchers,
}