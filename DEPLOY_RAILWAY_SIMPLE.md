DEPLOY TO RAILWAY (Gratis + Mudah)
==================================

Railway memberikan FREE credits USD $5/bulan.
Cukup untuk app + MySQL database kecil sampai medium untuk development/testing.

Ini paling gampang - NO CODE CHANGES NEEDED, tetap pakai MySQL!

---

STEP 1: Sign Up Railway
======================

1. Go to https://railway.app

2. Click "Start Free"

3. Sign up dengan GitHub (paling gampang)
   - Authorize Railway akses GitHub

4. Done! Anda sudah punya Railway account + free credits

---

STEP 2: Create Railway Project
==============================

1. Di Railway dashboard, klik "New Project"

2. Select "Create New":
   - "Empty Project" (paling simple)

3. Name project: "revoz-ultra-pro-max"

4. Confirm

---

STEP 3: Add MySQL Database
===========================

1. Di project Anda, klik "+ New"

2. Select "MySQL"

3. Railway akan provision MySQL database otomatis
   - Tunggu ~1-2 menit

4. Setelah jadi, klik service "MySQL"

5. Di tab "Variables", lihat credentials:
   - MYSQL_HOST
   - MYSQL_PORT (default 3306)
   - MYSQL_DATABASE
   - MYSQL_USER
   - MYSQL_PASSWORD
   - DATABASE_URL (sudah lengkap format)

6. Copy credentials ini dan update .env project Anda:

   DB_HOST=MYSQL_HOST (dari Railway)
   DB_PORT=3306
   DB_USER=MYSQL_USER (dari Railway)
   DB_PASSWORD=MYSQL_PASSWORD (dari Railway)
   DB_NAME=MYSQL_DATABASE (dari Railway)

---

STEP 4: Import Database Schema
===============================

Ada 3 cara. Pilih salah satu:

CARA A: Railway CLI (Recommended)
1. Install Railway CLI:
   npm install -g @railway/cli

2. Login:
   railway login

3. Connect ke project:
   railway link

   (Pilih project Anda dari list)

4. Import schema:
   railway run mysql -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < schema.sql

   (atau manual: railway run mysql, lalu SOURCE schema.sql;)

CARA B: MySQL Client dari lokal
1. Gunakan mysql CLI lokal Anda:
   mysql -h MYSQL_HOST -u MYSQL_USER -pMYSQL_PASSWORD < schema.sql

2. Replace MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD dengan nilai dari Railway

CARA C: Via Railway Web Terminal
1. Di Railway service MySQL, klik tab "Connect"
2. Copy connection string
3. Jalankan di terminal lokal
4. Atau gunakan phpMyAdmin jika Railway sediakan

---

STEP 5: Deploy App ke Railway
==============================

1. Push project ke GitHub:
   git add .
   git commit -m "Ready for Railway deployment"
   git push

2. Di Railway dashboard, klik "+ New"

3. Select "GitHub Repo"

4. Authorize Railway GitHub access (jika belum)

5. Select repository: "revoz-ultra-pro-max"

6. Railway auto-detect Node.js project

7. Configure:
   - Root Directory: . (current)
   - Build Command: npm install (auto-filled)
   - Start Command: npm start (auto-filled, harus match package.json)
   - Port: 3000 (auto-detect)

8. Add Environment Variables:
   Click "+ Add Variable" untuk setiap:

   PORT=3000
   DB_HOST=${{ MySQL.MYSQL_HOST }}
   DB_PORT=3306
   DB_USER=${{ MySQL.MYSQL_USER }}
   DB_PASSWORD=${{ MySQL.MYSQL_PASSWORD }}
   DB_NAME=${{ MySQL.MYSQL_DATABASE }}
   SESSION_SECRET=your_very_secure_session_key_here
   NODE_ENV=production

   Note: ${{ MySQL.MYSQL_HOST }} dll = Railway auto-reference ke MySQL service

9. Click "Deploy"

10. Railway akan build & deploy aplikasi Anda
    - Tunggu 2-5 menit
    - Lihat logs untuk progress

11. Setelah deployed, Anda dapat URL seperti:
    https://revoz-ultra-pro-max.up.railway.app

---

STEP 6: Link MySQL Service ke App
==================================

Railway perlu tahu kalau app menggunakan MySQL service:

1. Di project dashboard
2. Klik "Web Service" Anda (atau app)
3. Di tab "Variables", Railway akan auto-detect MySQL service
4. Klik "Add MySQL" atau "Connect Service"
5. Select MySQL dari list
6. Railway auto-inject MySQL variables ke app

---

STEP 7: Test Live App
=====================

1. Open your Railway app URL
2. Test login / register
3. Test database queries
4. Check logs jika ada error

Monitor logs:
- Railway Dashboard → Web Service → Logs (real-time)

---

TROUBLESHOOTING
===============

Issue: "Cannot connect to database"
- Solution: Verify DB_HOST, DB_USER, DB_PASSWORD di Railway Variables
- Check schema.sql imported successfully (run: show tables;)
- Verify app using correct port (PORT=3000)

Issue: "Connection refused"
- Solution: Check MySQL service running (Railway → MySQL → should say "Running")
- Wait 2-3 minutes, Railway might still be starting

Issue: "Build failed"
- Solution: Check build logs, usually:
  - Missing dependency: npm install
  - Wrong start command in package.json
  - Syntax error in server.js

Issue: "Port 3000 already in use"
- Solution: Change PORT in .env to different port (3001, 8000, etc)

---

COST & FREE TIER DETAILS
========================

Railway Free Tier:
- USD $5/month in free credits
- Includes: 500MB RAM, 1 GB storage
- Enough for: 1 small app + 1 MySQL database + light traffic

After $5 credit:
- Auto-pause services (won't charge by default)
- Or upgrade to paid (pay-as-you-go, very cheap for small projects)

Pro tip: Sign up with GitHub Student Offer or GitHub Sponsors = extra credits!

---

UPDATE CODE (After Deployment)
===============================

Every time you change code:

1. Commit locally:
   git add .
   git commit -m "Feature: xyz"
   git push origin main

2. Railway auto-detect push and redeploy (webhooks enabled by default)

3. Check Railway Logs to confirm deploy successful

4. Your live app updates automatically!

---

MONITORING & UPTIME
===================

Railway free tier might sleep if no traffic.
To prevent:
- Use UptimeRobot (https://uptimerobot.com) to ping app every 5 min
- Or upgrade to paid Railway

---

NEXT STEPS
==========

1. ✅ Go https://railway.app → Sign up
2. ✅ Create project + MySQL service
3. ✅ Import schema.sql
4. ✅ Push code to GitHub
5. ✅ Deploy from GitHub repo
6. ✅ Test live app
7. ✅ Monitor with UptimeRobot

Done! Your app live on Railway!

Questions? Railway docs: https://railway.app/docs
