// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Display authentication page for both login and register
router.get('/register', authController.getRegisterPage);
router.get('/login', authController.getLoginPage);

// Handle register form submission
router.post('/register', authController.postRegister);

// Handle login form submission
router.post('/login', authController.postLogin);

// Handle logout
router.get('/logout', authController.logout);

module.exports = router;
