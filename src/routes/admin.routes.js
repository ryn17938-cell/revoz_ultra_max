// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAdmin } = require('../middlewares/auth.middleware');
const upload = require('../config/multer-config');

// Note: All routes in this file are prefixed with /admin

// Admin Dashboard
router.get('/dashboard', isAdmin, adminController.getDashboard);

// Products Management
router.get('/products', isAdmin, adminController.getProducts);
router.post('/products/add', isAdmin, upload, adminController.addProduct);
router.post('/products/edit', isAdmin, upload, adminController.editProduct);
router.post('/products/delete/:id', isAdmin, adminController.deleteProduct);

// Order Management
router.get('/orders', isAdmin, adminController.getOrders);
router.post('/orders/status/:id', isAdmin, adminController.updateOrderStatus);

// User Management
router.get('/users', isAdmin, adminController.getUsers);
router.post('/users/toggle-status/:id', isAdmin, adminController.toggleUserStatus);

// Admin Settings
router.get('/settings', isAdmin, adminController.getSettingsPage);
router.post('/settings/change-password', isAdmin, adminController.changeAdminPassword);

module.exports = router;
