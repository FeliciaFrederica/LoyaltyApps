const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authRepository = require('./auth-repository');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');

function generateToken(user) {
  const secretKey = process.env.JWT_SECRET;
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    timestamp: Date.now(),
  };
  return jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });
}

async function register(email, password, fullName) {
  // 1. cek user sudah ada
  const existingUser = await authRepository.getUserByEmail(email);
  if (existingUser) {
    throw errorResponder(
      errorTypes.EMAIL_ALREADY_TAKEN,
      'Email already registered'
    );
  }

  if (password.length < 8) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Password minimal 8 karakter'
    );
  }

  // 2. hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. simpan user
  const user = await authRepository.createUser({
    email,
    password: hashedPassword,
    fullName,
    role: 'user',
  });

  return {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserByEmail(email);
  const userPass = user ? user.password : '<RANDOM>';
  const loginPassed = await passwordMatched(password, userPass);

  if (user && loginPassed) {
    return {
      id: user._id,
      email: user.email,
      token: generateToken(user),
    };
  }

  return null;
}

module.exports = {
  checkLogin,
  register,
};
