const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.user.id);

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  // TODO: Implement this function
  // const id = request.params.id;
  // const {
  //   old_password: oldPassword,
  //   new_password: newPassword,
  //   confirm_new_password: confirmNewPassword,
  // } = request.body;
  //
  // Make sure that:
  // - the user exists by checking the user ID
  // - the old password is correct
  // - the new password is at least 8 characters long
  // - the new password is different from the old password
  // - the new password and confirm new password match
  //
  // Note that the password is hashed in the database, so you need to
  // compare the hashed password with the old password. Use the passwordMatched
  // function from src/utils/password.js to compare the old password with the
  // hashed password.
  //
  // If any of the conditions above is not met, return an error response
  // with the appropriate status code and message.
  //
  // If all conditions are met, update the user's password and return
  // a success response.
  return next(errorResponder(errorTypes.NOT_IMPLEMENTED));
}

module.exports = {
  getUser,
  changePassword,
};
