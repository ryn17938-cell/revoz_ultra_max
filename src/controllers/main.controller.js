// src/controllers/main.controller.js
const db = require('../config/db');

// Render Home Page with products
exports.getHomePage = async (req, res, next) => {
  try {
    const [products] = await db.query(
      `SELECT p.id, p.name, p.slug, p.price, pi.image_url 
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_featured = 1
       ORDER BY p.created_at DESC
       LIMIT 12`
    );
    res.render('pages/index', {
      title: 'Home',
      products: products
    });
  } catch (err) {
    next(err);
  }
};

// Render Product Detail Page
exports.getProductDetailPage = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const [rows] = await db.query(
      `SELECT p.*, c.name as category_name, pi.image_url
       FROM products p
       JOIN categories c ON p.category_id = c.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_featured = 1
       WHERE p.slug = ?`,
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).render('pages/404', { title: 'Product Not Found' });
    }

    res.render('pages/product-detail', {
      title: rows[0].name,
      product: rows[0]
    });
  } catch (err) {
    next(err);
  }
};

// Render Cart Page (stub)
exports.getCartPage = (req, res) => {
  res.render('pages/cart', {
    title: 'Your Cart',
    cartItems: [] // Dummy data, replace with real logic
  });
};

// Render Checkout Page (stub)
exports.getCheckoutPage = (req, res) => {
  res.render('pages/checkout', {
    title: 'Checkout'
  });
};

// Render Products by Category Page
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Get category details
    const [categories] = await db.query('SELECT id, name FROM categories WHERE slug = ?', [slug]);
    if (categories.length === 0) {
      return res.status(404).render('pages/404', { title: 'Category Not Found' });
    }
    const category = categories[0];

    // Get products for that category
    const [products] = await db.query(
      `SELECT p.id, p.name, p.slug, p.price, pi.image_url 
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_featured = 1
       WHERE p.category_id = ?
       ORDER BY p.created_at DESC`,
      [category.id]
    );

    res.render('pages/category', {
      title: category.name,
      categoryName: category.name,
      products: products
    });
  } catch (err) {
    next(err);
  }
};
