QUICK REFERENCE: Deploy to Railway (Gratis)
===========================================

Railway FREE: USD $5/bulan credits (buat app + database kecil)

---

CHECKLIST

[ ] Signup Railway: https://railway.app
[ ] Create project
[ ] Add MySQL service (Railway provision otomatis)
[ ] Copy DB credentials dari Railway → update .env lokal
[ ] Import schema.sql ke Railway MySQL
[ ] Push code ke GitHub
[ ] Connect Railway ke GitHub repo
[ ] Add environment variables di Railway
[ ] Deploy!
[ ] Test live URL

---

RAILWAY VARIABLES (Copy dari Railway Dashboard)

DB_HOST = MYSQL_HOST
DB_PORT = 3306
DB_USER = MYSQL_USER  
DB_PASSWORD = MYSQL_PASSWORD
DB_NAME = MYSQL_DATABASE

---

QUICK COMMANDS

Sign up:        https://railway.app
Login GitHub:   Authorize

Create project: Dashboard → New Project → Create New → Empty Project
Add MySQL:      Project → + New → MySQL
Import schema:  railway run mysql ... < schema.sql
Deploy app:     GitHub repo → New → GitHub Repo

---

DEPLOYMENT URL

After deploy, your app live at:
https://[project-name].up.railway.app

Example: https://revoz-ultra-pro-max.up.railway.app

---

SUPPORT

Railway docs:   https://railway.app/docs
Status page:    https://status.railway.app
Community:      https://railway.app/community
