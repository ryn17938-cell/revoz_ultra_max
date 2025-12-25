// src/middlewares/auth.middleware.js

// Checks if a user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};

// Checks if the authenticated user has the 'admin' role
exports.isAdmin = (req, res, next) => {
    if (!req.session.isLoggedIn || !req.session.user || req.session.user.role !== 'admin') {
        // Redirect non-admins to the homepage or a login page
        return res.redirect('/'); 
    }
    next();
};
