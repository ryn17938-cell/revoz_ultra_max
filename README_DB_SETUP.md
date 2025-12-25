Database setup for this project (MySQL / MAMP)
============================================

This file explains how to create/import the MySQL database included in `schema.sql`.

Quick notes
- The repository already contains `schema.sql` which creates the database `revoz_ultra_max` and all tables, plus seed data.
- Place the QRIS image at `uploads/qris/qris-sample.png` (or update `qris_images.image_url` with the path you use).
- The project reads DB connection from environment variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

1) Using MAMP (GUI / phpMyAdmin) - Windows or macOS
- Start MAMP and start the servers (MySQL must be running).
- Open phpMyAdmin (usually at `http://localhost:8888/phpmyadmin/` or the URL shown in MAMP control panel).
- In phpMyAdmin, choose "Import" and select the `schema.sql` file from the project root, then click Go.

2) Using MySQL CLI (if you have `mysql` in PATH)
- Open PowerShell or terminal and run:
```powershell
mysql -u root -p < "C:\Users\REZY\OneDrive\ドキュメント\revoz ultra pro max 16\schema.sql"
```
- Enter the root password when prompted. This will create the `revoz_ultra_max` database and all tables.

3) Using MAMP's mysql client (Windows)
- If MAMP is installed in `C:\MAMP`, the CLI client is at `C:\MAMP\bin\mysql\bin\mysql.exe`.
- Run in PowerShell (adjust paths if different):
```powershell
"C:\MAMP\bin\mysql\bin\mysql.exe" -u root -p < "C:\Users\REZY\OneDrive\ドキュメント\revoz ultra pro max 16\schema.sql"
```

4) Create a dedicated DB user for the app (recommended)
- After importing, login as root and run:
```sql
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON revoz_ultra_max.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
```
- Then update your `.env` with `DB_USER=appuser` and `DB_PASSWORD=secure_password`.

5) Place the QRIS image
- Create folder and copy the QRIS image:
```powershell
mkdir .\uploads\qris
# copy your image into uploads\qris\qris-sample.png
```
- Make sure Express serves the folder (check `server.js` or add `app.use('/uploads', express.static('uploads'))`).

6) Troubleshooting
- If `mysql` command not found, either add MySQL's `bin` folder to PATH or use MAMP's `mysql.exe` path.
- If import fails due to foreign key order, use the provided `schema.sql` which drops tables first and creates them in proper order.

If you want, I can:
- Run the import here (I can run `mysql` commands if you tell me which client to use and provide credentials), or
- Add an npm script to run the import (requires MySQL client available), or
- Create a small admin script to manage QRIS images and payment records.

---
File: `schema.sql`
Path: project root
