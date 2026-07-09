const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { registerValidation, loginValidation } = require('./auth.validation');
const { register, login, logout, getCurrentUser, updateProfile } = require('./auth.controller');

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/logout', logout);
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateProfile);

module.exports = router;
