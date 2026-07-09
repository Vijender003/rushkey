const User = require('../../models/User');
const asyncHandler = require('../../utils/asyncHandler');
const createError = require('../../utils/ApiError');
const config = require('../../config/env');

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateJwtToken();
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + config.cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: config.nodeEnv === 'production',
  });
  user.password = undefined;
  res.status(statusCode).json({ success: true, token, user });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError('A user with this email already exists.', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'user',
  });

  sendTokenResponse(user, 201, res);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw createError('Invalid email or password.', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw createError('Invalid email or password.', 401);
  }

  sendTokenResponse(user, 200, res);
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: config.nodeEnv === 'production',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, avatar } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw createError('User not found.', 404);
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = { register, login, logout, getCurrentUser, updateProfile };