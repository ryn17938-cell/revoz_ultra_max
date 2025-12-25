MIGRATION GUIDE: MySQL to PostgreSQL
=====================================

Jika ingin gunakan Railway atau Supabase gratis, perlu migrasi dari MySQL ke PostgreSQL.
Berikut perbedaan dan cara update code:

SYNTAX DIFFERENCES
==================

1. AUTO_INCREMENT → SERIAL

   MySQL:
   CREATE TABLE users (
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     PRIMARY KEY (id)
   );

   PostgreSQL:
   CREATE TABLE users (
     id BIGSERIAL PRIMARY KEY
   );

2. VARCHAR → VARCHAR atau TEXT

   (sama saja, tapi PostgreSQL lebih fleksibel)

3. BOOLEAN vs TINYINT(1)

   MySQL:
   is_active BOOLEAN NOT NULL DEFAULT TRUE

   PostgreSQL:
   is_active BOOLEAN NOT NULL DEFAULT TRUE

   (sama, PostgreSQL juga punya BOOLEAN)

4. DECIMAL → NUMERIC

   MySQL:
   price DECIMAL(10, 2)

   PostgreSQL:
   price NUMERIC(10, 2)

   (bisa keduanya, hasil sama)

5. TIMESTAMP AUTO

   MySQL:
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

   PostgreSQL:
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

   (hampir sama, PostgreSQL bisa timezone-aware)

6. ENUM

   MySQL:
   payment_method ENUM('cod','qris','bank_transfer','e_wallet')

   PostgreSQL:
   payment_method VARCHAR(20)

   atau create custom type:
   CREATE TYPE payment_method_type AS ENUM ('cod', 'qris', 'bank_transfer', 'e_wallet');
   payment_method payment_method_type

7. Foreign Key Constraints

   (syntax mirip, tapi PostgreSQL lebih strict)

CONNECTION STRING
=================

MySQL:
mysql://user:password@localhost:3306/database

PostgreSQL:
postgresql://user:password@localhost:5432/database

Node.js Driver Change (if needed)
==================================

MySQL + Node.js:
npm install mysql2/promise

PostgreSQL + Node.js:
npm install pg
npm install pg-promise  (atau gunakan query builder seperti Knex)

Update src/config/db.js:

BEFORE (MySQL):
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

AFTER (PostgreSQL):
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432
});

BUT: Bisa juga tetap gunakan mysql2, dan Railway/Supabase provide MySQL juga.
Tapi gratis tier MySQL di luar Railway susah dicari.

EASIEST PATH: Keep using mysql2 driver + Railway (free credits)
================================================================

Railway supports MySQL and PostgreSQL.
Jadi bisa tetap gunakan existing mysql2 code tanpa change!

1. Di Railway, "Add Service" → "MySQL"
2. Railway provision MySQL untuk Anda
3. Deploy dengan kode existing (no changes needed!)
4. Free credits USD 5/bulan untuk MySQL + app

---

REKOMENDASI FINAL
=================

OPSI 1: Railway (Easiest)
- Sign up Railway
- Add MySQL service
- Deploy app (no code changes)
- Free USD 5/bulan
- AUTO-SCALE kapan perlu

OPSI 2: Supabase + Render (100% Free but more setup)
- Supabase: PostgreSQL gratis 500MB
- Render: Hosting app gratis (auto-sleep)
- Perlu update db.js ke PostgreSQL driver (pg)
- Perlu migrate schema dari MySQL ke PostgreSQL

OPSI 3: AWS RDS Free Tier (1 year free, perlu kartu kredit)
- MySQL free 1 tahun
- Render: Hosting gratis
- Tidak perlu code changes
- Setelah 1 tahun perlu bayar

Saya rekomendasikan: OPSI 1 (Railway) - paling simple!

Mau saya update guide untuk Railway dengan MySQL?
