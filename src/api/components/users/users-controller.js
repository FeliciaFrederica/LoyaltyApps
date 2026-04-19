const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { passwordMatched, hashPassword } = require('../../../utils/password');

async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.user._id);

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  try {
    const { id } = request.params;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    const user = await usersService.getUserWithPassword(id);
    if (!user) {
      throw errorResponder(errorTypes.NOT_FOUND, 'User tidak ditemukan');
    }

    const isMatch = await passwordMatched(oldPassword, user.password);
    if (!isMatch) {
      throw errorResponder(errorTypes.UNAUTHORIZED, 'Password lama salah');
    }

    if (newPassword.length < 8) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Password minimal 8 karakter'
      );
    }

    if (oldPassword === newPassword) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Password baru tidak boleh sama dengan yang lama'
      );
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Konfirmasi password tidak cocok'
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);
    await usersService.changePassword(id, hashedNewPassword);

    return response.status(200).json({ message: 'Password berhasil diubah' });
  } catch (error) {
    return next(error);
  }
}

async function getMemberships(request, response, next) {
  try {
    const { user, totalSpent } = await usersService.getUserMembershipData(
      request.user._id
    );

    let tier = 'Silver';
    let discount = 0;
    let pointMultiplier = 1;
    let hasBirthdayVoucher = false;

    if (totalSpent > 800000) {
      tier = 'Platinum';
      discount = 10;
      pointMultiplier = 2;
      hasBirthdayVoucher = true;
    } else if (totalSpent > 300000) {
      tier = 'Gold';
      discount = 5;
      hasBirthdayVoucher = true;
    }

    return response.status(200).json({
      fullName: user.fullName,
      currentPoints: user.points,
      totalSpent: totalSpent,
      membership: {
        tier: tier,
        benefits: {
          discount: `${discount}%`,
          pointsRule: `${pointMultiplier} poin per Rp30.000`,
          birthdayVoucher: hasBirthdayVoucher ? 'Tersedia' : 'Tidak Tersedia',
        },
        nextRewardAt:
          user.points < 10
            ? `Butuh ${10 - user.points} poin lagi untuk tukar voucher`
            : 'Poin cukup untuk ditukar!',
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUser,
  changePassword,
  getMemberships,
};
