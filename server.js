// server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

// Load environment variables
dotenv.config();

// Import routes
const mainRoutes = require('./src/routes/main.routes');
const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
// Import middleware
const { isAdmin, isLoggedIn } = require('./src/middlewares/auth.middleware');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to make session available in all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Middleware to fetch all categories and make them available in all views
const db = require('./src/config/db');
app.use(async (req, res, next) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    res.locals.allCategories = categories;
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware to redirect to login if not logged in and trying to access root
app.use('/', (req, res, next) => {
  if (req.path === '/' && !req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
});

// Use routes
app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/admin', isAdmin, adminRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).render('pages/404', { title: 'Page Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500', { title: 'Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
