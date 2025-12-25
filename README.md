# RevorZ Ultra Pro Max - Full-Stack E-Commerce

Modern e-commerce platform untuk smartwatch dengan fitur:
- ✅ User & Admin authentication (login/register)
- ✅ Product catalog dengan categories
- ✅ Shopping cart & checkout
- ✅ Payment methods: COD & QRIS
- ✅ Admin dashboard (products, orders, users)
- ✅ Responsive design

---

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: EJS templates + Vanilla JS + CSS
- **Database**: MySQL
- **Authentication**: Express-session + Bcrypt

---

## Features

### User Features
- Register & Login
- Browse products by category
- Add to cart
- Checkout with shipping address
- Payment method selection (COD/QRIS)
- View order history

### Admin Features
- Dashboard analytics
- Manage products
- Manage orders
- Manage users
- View payment details
- QRIS image management

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 14+
- MySQL 8.0+

### Setup

1. Clone repository:
```bash
git clone https://github.com/ryn17938-cell/revoz_ultra_max.git
cd revoz_ultra_max
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment:
```bash
cp .env.example .env
```

4. Configure `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=revoz_ultra_max
SESSION_SECRET=your_secure_key
```

5. Create database:
```bash
mysql -u root -p < schema.sql
```

6. Start server:
```bash
npm start
```

7. Open: http://localhost:3000

---

## Login Credentials

### Admin
- Email: `admin@chronoware.com`
- Password: (check schema.sql for hashed password)

### Customer
- Email: `john.doe@example.com`
- Password: (check schema.sql for hashed password)

---

## File Structure

```
.
├── public/              # Static files (CSS, JS, images)
├── src/
│   ├── config/         # Database & file upload config
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Auth middleware
│   ├── routes/         # API routes
│   └── views/          # EJS templates
├── uploads/            # User uploads (products, QRIS)
├── schema.sql          # Database schema
├── server.js           # Main entry point
└── package.json        # Dependencies
```

---

## Database Schema

Key tables:
- `users` - User accounts (admin + customer)
- `products` - Product catalog
- `categories` - Product categories
- `cart_items` - Shopping cart
- `orders` - Customer orders
- `order_items` - Items in orders
- `payments` - Payment records (COD/QRIS)
- `qris_images` - QRIS payment images
- `shipping_addresses` - Customer addresses

---

## Deployment

### Option 1: Replit (Recommended - Easiest)
1. Go to https://replit.com
2. Sign up with GitHub
3. Create → Import from GitHub
4. Select this repo
5. Click "Run"
6. App live at https://[project].replit.dev

See `DEPLOY_REPLIT.md` for detailed steps.

### Option 2: Render + Supabase (Advanced)
- Render: Node.js hosting
- Supabase: PostgreSQL database
- Requires migration from MySQL

### Option 3: Docker
Build and run with Docker for any hosting platform.

---

## Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=revoz_ultra_max
SESSION_SECRET=your_secret_key
NODE_ENV=development
```

---

## API Endpoints

### Auth
- `POST /register` - Create new user
- `POST /login` - User login
- `GET /logout` - Logout

### Products
- `GET /` - Home with products
- `GET /product/:id` - Product details
- `GET /category/:slug` - Products by category

### Cart
- `POST /cart/add` - Add to cart
- `GET /cart` - View cart
- `POST /cart/update` - Update quantity

### Checkout
- `POST /checkout` - Create order
- `GET /checkout` - Checkout page

### Orders
- `GET /orders` - User orders (logged in)

### Admin
- `GET /admin/dashboard` - Dashboard
- `GET /admin/products` - Manage products
- `POST /admin/products` - Create product
- `GET /admin/orders` - View orders
- `GET /admin/users` - Manage users

---

## Configuration

### Database Connection (`src/config/db.js`)
- Uses mysql2/promise for async queries
- Connection pooling for performance

### File Upload (`src/config/multer-config.js`)
- Max file size: 5MB
- Supported formats: jpg, jpeg, png

### Authentication (`src/middlewares/auth.middleware.js`)
- Session-based auth
- Role check for admin routes (isAdmin middleware)

---

## Security Notes

- ⚠️ Never commit `.env` file
- ⚠️ Use HTTPS in production
- ⚠️ Hash passwords with bcrypt (already implemented)
- ⚠️ Validate user input server-side (implement if needed)
- ⚠️ Use environment variables for secrets

---

## Troubleshooting

### Database connection error
- Check MySQL is running
- Verify `.env` credentials
- Ensure database created: `mysql -u root -p < schema.sql`

### Port already in use
- Change PORT in `.env` to different port
- Or kill process: `lsof -ti:3000 | xargs kill -9` (Linux/Mac)

### File upload not working
- Check `uploads/` folder exists and is writable
- Verify multer config in `src/config/multer-config.js`

### Session not persisting
- Check SESSION_SECRET in `.env`
- Clear browser cookies and try again
- Ensure express-session middleware in `server.js`

---

## Contributing

To contribute:
1. Fork repository
2. Create feature branch: `git checkout -b feature/xyz`
3. Commit: `git commit -m "Add feature xyz"`
4. Push: `git push origin feature/xyz`
5. Open Pull Request

---

## License

MIT License - feel free to use for personal/commercial projects

---

## Support

- 📧 Email: ryn17938-cell@gmail.com
- 🐙 GitHub: https://github.com/ryn17938-cell/revoz_ultra_max
- 📚 Documentation: See `DEPLOY_REPLIT.md`

---

## Roadmap

- [ ] Payment gateway integration (Midtrans, Xendit)
- [ ] Email notifications
- [ ] Product reviews & ratings
- [ ] Wishlist feature
- [ ] Admin analytics dashboard
- [ ] Inventory management
- [ ] Coupon/discount system
- [ ] Mobile app (React Native)

---

Happy coding! 🚀
