DEPLOY TO REPLIT (100% Free, Easiest Setup)
============================================

Replit adalah platform coding online yang bisa host full-stack app gratis langsung.
Tidak perlu setup database terpisah - Replit support MySQL built-in.

---

STEP 1: Sign Up Replit
=====================

1. Go to https://replit.com
2. Click "Sign up"
3. Choose GitHub login (paling gampang)
4. Authorize Replit ke GitHub

---

STEP 2: Import GitHub Repository
================================

1. Di Replit home, klik "+ Create"
2. Select "Import from GitHub"
3. Paste repo URL: https://github.com/ryn17938-cell/revoz_ultra_max
4. Click "Import from GitHub"
5. Wait ~1-2 minutes for import complete

---

STEP 3: Setup Environment Variables
===================================

Replit sudah setup MySQL untuk Anda secara otomatis.

1. Di Replit, buka "Secrets" (kunci icon di sidebar)
2. Add variables:

   DATABASE_URL=mysql://user:password@localhost:3306/database
   
   atau individual:
   
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password123
   DB_NAME=revoz_ultra_max
   SESSION_SECRET=your_secure_session_key_here

3. Replit will provide credentials otomatis - copy dari "Environment" atau docs

---

STEP 4: Import Database Schema
===============================

1. Di Replit, buka "Shell" tab
2. Run command:
   mysql < schema.sql

3. Or import via Replit MySQL interface

---

STEP 5: Run Project
===================

1. Di Replit, klik "Run" button (atau Ctrl+Enter)
2. Replit auto-detect npm start command
3. Project akan run di https://[project-name].replit.dev
4. Click "Open in new tab" untuk akses live URL

---

STEP 6: Test Live App
=====================

1. Open Replit app URL
2. Test login/register
3. Test database
4. Check console logs untuk errors

---

AUTO-DEPLOY ON PUSH
===================

Setiap kali push ke GitHub:
1. Replit auto-pull latest code (kalau enabled)
2. atau manual: klik "Pull from GitHub"
3. Click "Run" untuk redeploy

---

FEATURES & LIMITS
=================

✅ FREE TIER:
- Unlimited projects
- Always-on (tidak auto-sleep)
- Built-in MySQL database
- 10 GB storage
- Real-time collaboration

❌ LIMITS:
- Performance terbatas (1-2s response time)
- Resource limit (1GB RAM)
- Tidak cocok for high-traffic production
- Cocok untuk development/learning/demo

---

TIPS & BEST PRACTICES
====================

1. Keep code clean - remove console.log
2. Use .env untuk credentials (NEVER commit secrets)
3. Monitor resource usage (Replit → Tools → Resource Monitor)
4. Backup database regularly
5. Test locally before push

---

TROUBLESHOOTING
===============

Q: "Cannot connect to database"
A: Check .env variables, run: mysql -u root -p
   Verify schema imported: SHOW TABLES;

Q: "App won't start"
A: Check server.js listens to process.env.PORT
   Check package.json "start" script
   See console logs untuk error message

Q: "File upload not working"
A: Check public/ folder writable
   Verify multer config di src/config/multer-config.js
   Check uploads/ folder exists

Q: "Performance slow"
A: Replit free tier terbatas, normal
   Optimize queries, add caching jika perlu
   Upgrade ke Replit paid ($7/month) untuk lebih power

---

WHEN READY FOR PRODUCTION
==========================

Jika performance tidak cukup, migrate ke:
- Render + Supabase (upgrade path recommended)
- AWS (lebih mahal tapi scalable)
- DigitalOcean (USD 6/month untuk VPS)

Tapi untuk development/learning, Replit 100% cocok!

---

That's it! Your app is live on Replit.

Questions? Replit docs: https://docs.replit.com
