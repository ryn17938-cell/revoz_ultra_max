// src/controllers/admin.controller.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Display Admin Dashboard with overview stats
exports.getDashboard = async (req, res, next) => {
    try {
        const [
            [{ totalProducts }],
            [{ totalUsers }],
            [{ totalOrders }],
            [{ totalRevenue }]
        ] = await Promise.all([
            db.query("SELECT COUNT(id) as totalProducts FROM products"),
            db.query("SELECT COUNT(id) as totalUsers FROM users WHERE role_id = 2"), // role_id 2 for 'customer'
            db.query("SELECT COUNT(id) as totalOrders FROM orders"),
            db.query("SELECT SUM(total_amount) as totalRevenue FROM orders WHERE status IN ('paid', 'delivered', 'shipped')")
        ]);

        res.render('pages/admin-dashboard', {
            title: 'Admin Dashboard',
            path: '/admin/dashboard',
            stats: {
                totalProducts,
                totalUsers,
                totalOrders,
                totalRevenue: totalRevenue || 0
            }
        });
    } catch (err) {
        next(err);
    }
};

// Display Product Management page
exports.getProducts = async (req, res, next) => {
    try {
        const [products] = await db.query(
            `SELECT p.id, p.name, p.price, p.stock, c.name as category_name, p.description, p.category_id, pi.image_url
             FROM products p
             JOIN categories c ON p.category_id = c.id
             LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_featured = 1
             ORDER BY p.created_at DESC`
        );
        const [categories] = await db.query('SELECT * FROM categories ORDER BY name ASC');

        res.render('pages/admin-products', {
            title: 'Product Management',
            path: '/admin/products',
            products: products,
            categories: categories
        });
    } catch (err) {
        next(err);
    }
};

// Add a new product
exports.addProduct = async (req, res, next) => {
    const { name, description, price, stock, category_id } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        const [result] = await db.query(
            'INSERT INTO products (name, slug, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?, ?)',
            [name, slug, description, price, stock, category_id]
        );
        
        const productId = result.insertId;

        // If an image was uploaded, add it to the product_images table
        if (req.file) {
            const imageUrl = req.file.path.replace(/\\/g, '/'); // Normalize path for web
            await db.query(
                'INSERT INTO product_images (product_id, image_url, is_featured) VALUES (?, ?, ?)',
                [productId, imageUrl, true]
            );
        }

        res.redirect('/admin/products');
    } catch (err) {
        next(err);
    }
};

// Edit an existing product
exports.editProduct = async (req, res, next) => {
    const { id, name, description, price, stock, category_id } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        await db.query(
            `UPDATE products 
             SET name = ?, slug = ?, description = ?, price = ?, stock = ?, category_id = ? 
             WHERE id = ?`,
            [name, slug, description, price, stock, category_id, id]
        );

        // If a new image was uploaded, replace the old one
        if (req.file) {
            const imageUrl = req.file.path.replace(/\\/g, '/'); // Normalize path
            // Remove old featured image reference
            await db.query('DELETE FROM product_images WHERE product_id = ? AND is_featured = 1', [id]);
            // Add new featured image reference
            await db.query(
                'INSERT INTO product_images (product_id, image_url, is_featured) VALUES (?, ?, ?)',
                [id, imageUrl, true]
            );
        }

        res.redirect('/admin/products');
    } catch (err) {
        next(err);
    }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.redirect('/admin/products'); // Redirect to the new products page
    } catch (err) {
        next(err);
    }
};

// --- ORDER MANAGEMENT ---

// Display Order Management page
exports.getOrders = async (req, res, next) => {
    try {
        const [orders] = await db.query(`
            SELECT o.id, o.total_amount, o.status, o.created_at, u.name as customer_name
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        `);
        res.render('pages/admin-orders', {
            title: 'Order Management',
            path: '/admin/orders',
            orders: orders
        });
    } catch (err) {
        next(err);
    }
};

// Update an order's status
exports.updateOrderStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        res.redirect('/admin/orders');
    } catch (err) {
        next(err);
    }
};

// --- USER MANAGEMENT ---

// Display User Management page
exports.getUsers = async (req, res, next) => {
    try {
        const [users] = await db.query(
            "SELECT id, name, email, created_at, is_active FROM users WHERE role_id = 2 ORDER BY created_at DESC"
        );
        res.render('pages/admin-users', {
            title: 'User Management',
            path: '/admin/users',
            users: users
        });
    } catch (err) {
        next(err);
    }
};

// Toggle a user's active status (block/unblock)
exports.toggleUserStatus = async (req, res, next) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE users SET is_active = NOT is_active WHERE id = ?', [id]);
        res.redirect('/admin/users');
    } catch (err) {
        next(err);
    }
};

// --- ADMIN SETTINGS ---

// Display Admin Settings page
exports.getSettingsPage = (req, res, next) => {
    res.render('pages/admin-settings', {
        title: 'Admin Settings',
        path: '/admin/settings',
        message: req.query.message,
        messageType: req.query.type
    });
};

// Handle admin password change
exports.changeAdminPassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.session.user.id;

    try {
        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            return res.redirect('/admin/settings?message=New passwords do not match.&type=error');
        }
        
        // Get current password from DB
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [adminId]);
        const admin = users[0];

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.redirect('/admin/settings?message=Incorrect current password.&type=error');
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update password in DB
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, adminId]);

        res.redirect('/admin/settings?message=Password updated successfully.&type=success');
    } catch (err) {
        next(err);
    }
};
