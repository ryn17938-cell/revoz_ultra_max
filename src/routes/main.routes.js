// src/routes/main.routes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');

// Home page
router.get('/', mainController.getHomePage);

// Product detail page
router.get('/product/:slug', mainController.getProductDetailPage);

// Page for products by category
router.get('/category/:slug', mainController.getProductsByCategory);

// Cart page
router.get('/cart', mainController.getCartPage);

// Checkout page
router.get('/checkout', mainController.getCheckoutPage);

module.exports = router;
