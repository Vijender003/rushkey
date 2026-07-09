const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const createError = require('../utils/ApiError');
const User = require('../models/User');
const config = require('../config/env');

const protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(createError('Not authenticated. Please log in.', 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.id === 'demo-admin') {
      req.user = { _id: 'demo-admin', role: decoded.role, email: decoded.email, name: 'Admin' };
      return next();
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createError('User belonging to this token no longer exists.', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(createError('Invalid or expired token.', 401));
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};

module.exports = { protect, authorize };