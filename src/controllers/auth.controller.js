// src/controllers/auth.controller.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Display the Login page
exports.getLoginPage = (req, res) => {
  res.render('pages/login', {
    title: 'Login ke Revoz',
    error: req.query.error,
    bodyClass: 'auth-body'
  });
};

// Display the Register page
exports.getRegisterPage = (req, res) => {
  res.render('pages/register', {
    title: 'Daftar ke Revoz',
    error: req.query.error,
    bodyClass: 'auth-body'
  });
};

// Handle new user registration
exports.postRegister = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword || password.length < 6) {
    return res.redirect('/register?error=Invalid input. Password must be at least 6 characters long and match confirmation.');
  }

  if (password !== confirmPassword) {
    return res.redirect('/register?error=Passwords do not match.');
  }

  try {
    // Check if user already exists
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.redirect('/register?error=Email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into database (default role is 'customer', which is role_id 2 based on schema)
    await db.query(
      'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, 2)',
      [name, email, hashedPassword]
    );

    res.redirect('/login?message=Registration successful! Please log in.&type=success');
  } catch (err) {
    next(err);
  }
};

// Handle user login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const [users] = await db.query('SELECT u.*, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = ?', [email]);
    if (users.length === 0) {
      return res.redirect('/login?error=Invalid email or password.');
    }
    const user = users[0];

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect('/login?error=Invalid email or password.');
    }

    // Check if user is active
    if (!user.is_active) {
      return res.redirect('/login?error=Your account has been deactivated. Please contact support.');
    }

    // Set session variables
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_name // Storing role name e.g., 'admin' or 'customer'
    };
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      // Redirect admin to dashboard, customer to home
      if (user.role_name === 'admin') {
        res.redirect('/admin');
      } else {
        res.redirect('/');
      }
    });
  } catch (err) {
    next(err);
  }
};

// Handle user logout
exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};