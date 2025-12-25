DEPLOY GUIDE - Railway (Free Credits + Easy Setup)
==================================================

Railway memberikan FREE CREDITS USD $5/bulan - cukup untuk hosting app + database kecil sampai medium.
Ini lebih mudah dan gratis daripada Render + PlanetScale setup terpisah.

Prerequisites
- GitHub account (untuk push code)
- Railway account (https://railway.app - sign up dengan GitHub)

---

STEP 1: Setup Railway Project
=============================

1. Go to https://railway.app

2. Click "Start Project"

3. Choose template or "Deploy from GitHub repo"
   - Recommended: "Provision PostgreSQL" or skip dulu

4. Connect GitHub:
   - Click "Connect GitHub"
   - Authorize Railway
   - Select your repository

5. Railway will auto-detect Node.js project
   - Confirm settings and deploy

---

STEP 2: Add MySQL Database to Railway (Alternative 1: PostgreSQL)
==================================================================

Railway supports PostgreSQL (not MySQL), tapi itu gampang migrasi.

OPTION A: Gunakan PostgreSQL (Recommended - built-in Railway)

1. Di Railway dashboard, project Anda
2. Klik "+ New"
3. Pilih "PostgreSQL"
4. Railway auto-provision database

5. Copy credentials dari "PostgreSQL" service:
   - Host
   - Port
   - Database
   - Username
   - Password

OPTION B: Tetap MySQL? Gunakan Railway's MySQL (kalau ada)

1. Di Railway, klik "+ New" → "Add Service" → "MySQL"
2. atau skip dan ikuti opsi C di bawah

OPTION C: Database Eksternal (Jika ingin tetap MySQL)

Jika ingin gratis dan MySQL, gunakan:
- **Clever Cloud** (MySQL free tier)
- **Aiven** (MySQL free tier)
- **AWS RDS Free Tier** (perlu kartu kredit, tapi benar-benar gratis 1 tahun)

---

STEP 3: Update Database Schema untuk PostgreSQL
================================================

Jika Anda switch dari MySQL ke PostgreSQL, saya perlu update schema.sql.
Railway PostgreSQL auto-backup dan scaling.

Atau tetap use MySQL eksternal. Pilih dulu:
- A) Switch ke PostgreSQL (Railway bawaan) - RECOMMENDED
- B) Tetap MySQL eksternal

---

STEP 4: Update .env untuk Railway
==================================

Railway auto-inject environment variables dari database service.
Di dashboard Railway:

1. Klik "Service" → "PostgreSQL" (atau MySQL)
2. Di tab "Variables", copy semua:
   - DATABASE_URL (sudah lengkap)
   - DATABASE_HOST
   - DATABASE_PORT
   - DATABASE_USER
   - DATABASE_PASSWORD
   - DATABASE_NAME

3. Update .env di project:

   # Railway PostgreSQL
   DATABASE_URL=postgresql://user:password@host:port/database
   
   # atau untuk MySQL:
   DB_HOST=host
   DB_USER=user
   DB_PASSWORD=password
   DB_NAME=database

4. Update src/config/db.js jika perlu

---

STEP 5: Deploy & Auto-Update
=============================

1. Commit & push ke GitHub:
   git add .
   git commit -m "Update for Railway deployment"
   git push

2. Railway auto-detect dan redeploy

3. View live URL di Railway dashboard

---

RECOMMENDED: Switch to Supabase (100% Free PostgreSQL)
======================================================

Jika ingin pure GRATIS tanpa worry tentang credits:

1. Go to https://supabase.com

2. Sign up (free) - max 500 MB storage

3. Create new project:
   - Name: revoz-ultra
   - Region: closest to you
   - Password: set strong password

4. Copy connection string dari "Connection Pooler":
   postgresql://user:password@host:port/database

5. Add to .env:
   DATABASE_URL=postgresql://...

6. Migrate schema ke PostgreSQL (saya update schema ke PostgreSQL format)

7. Deploy app ke Render (untuk app hosting)

---

OPTION: Use Vercel + Supabase (Popular Combo)
==============================================

- **Vercel**: Free hosting untuk Node.js serverless (tapi app Anda Express tradisional)
- **Supabase**: Free PostgreSQL database
- Kombinasi ini gratis unlimited, tapi setup lebih kompleks

Bagaimana? Pilih mana:

A) Tetap Railway (mudah, free credits USD 5/bulan)
B) Switch Supabase + Render (100% gratis, perlu migrasi ke PostgreSQL)
C) Switch MySQL eksternal (Aiven, Clever Cloud, atau AWS RDS free tier)

Beri tahu pilihan Anda, saya update setup-nya!
