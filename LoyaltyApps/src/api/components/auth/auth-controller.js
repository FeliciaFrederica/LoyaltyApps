const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function registerUser(request, response, next) {
  try {
    const { email, password, fullName, confirmPassword } = request.body;

    if (password !== confirmPassword) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password tidak sama');
    }

    const result = await authService.register(email, password, fullName);

    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function loginUser(request, response, next) {
  try {
    const { email, password } = request.body;

    const loginResult = await authService.checkLogin(email, password);

    if (!loginResult) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }
    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
