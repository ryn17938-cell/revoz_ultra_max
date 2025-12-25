DEPLOY GUIDE - Render + PlanetScale (Free Hosting)
================================================

This guide explains how to deploy your full-stack Node.js + Express + MySQL app to Render (app hosting) and PlanetScale (database hosting) for FREE.

Prerequisites
- GitHub account (to push your code)
- Render account (https://render.com - free)
- PlanetScale account (https://planetscale.com - free)

---

STEP 1: Setup PlanetScale Database (Free MySQL)
================================================

1. Go to https://planetscale.com and sign up (free)

2. Create a new organization (or use default)

3. Create a new database:
   - Name: `revoz_ultra_max` (or any name)
   - Region: Choose closest to your location

4. Wait for database to be created (~1 min)

5. Go to "Connections" tab and select "Node.js"

6. You'll see a connection string like:
   mysql://user123:password456@aws.connect.psdb.cloud/revoz_ultra_max?sslMode=REQUIRE

7. Copy and save these values:
   - DB_HOST: aws.connect.psdb.cloud
   - DB_USER: user123 (from connection string)
   - DB_PASSWORD: password456 (from connection string)
   - DB_NAME: revoz_ultra_max

---

STEP 2: Import Your Database Schema
===================================

Option A: Using PlanetScale CLI (Recommended)

1. Install PlanetScale CLI:
   npm install -g @planetscale/cli

2. Login to PlanetScale:
   pscale auth login

3. Import schema (replace org_name with your org):
   pscale db shell revoz_ultra_max --org org_name < schema.sql

4. Verify tables were created:
   pscale db shell revoz_ultra_max --org org_name
   SHOW TABLES;
   EXIT;

Option B: Via PlanetScale Web Dashboard

1. Go to your database dashboard
2. Click "Import"
3. Upload schema.sql file
4. Wait for import to complete

---

STEP 3: Update Your Project Files
=================================

1. Update .env with PlanetScale credentials:

   DB_HOST=aws.connect.psdb.cloud
   DB_USER=user123
   DB_PASSWORD=password456
   DB_NAME=revoz_ultra_max
   SESSION_SECRET=your_secure_session_key_here
   NODE_ENV=production

2. Verify Procfile exists in project root:
   - File: Procfile (no extension)
   - Content: web: node server.js

3. Verify package.json has all dependencies:
   npm install

4. Test locally first (before pushing to Render):
   - Make sure local MySQL is working with same DB connection
   - Or temporarily switch .env to PlanetScale credentials and test
   - Run: npm start
   - Visit: http://localhost:3000

---

STEP 4: Push Code to GitHub
===========================

1. Create a new GitHub repository:
   - Go to https://github.com/new
   - Name: revoz-ultra-pro-max
   - Public or Private (doesn't matter for Render)

2. Push your project:
   git init
   git add .
   git commit -m "Initial commit - ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/revoz-ultra-pro-max.git
   git push -u origin main

3. Verify on GitHub that files are there (including .env.example and Procfile)

---

STEP 5: Deploy to Render
========================

1. Go to https://render.com and sign up (free)

2. Link your GitHub account:
   - Settings → Connected Services → GitHub
   - Authorize Render to access your repos

3. Create a new Web Service:
   - Dashboard → New +
   - Select "Web Service"

4. Select your GitHub repository:
   - Find: revoz-ultra-pro-max
   - Click Connect

5. Configure deployment settings:
   - **Name**: revoz-ultra-pro-max (or any name)
   - **Environment**: Node
   - **Region**: Choose closest to your location
   - **Branch**: main
   - **Build Command**: npm install
   - **Start Command**: node server.js
   - **Plan**: Free (auto-sleep after 15 min idle, but that's ok for development)

6. Add Environment Variables:
   - Click "Add Environment Variable" and enter:
   
   KEY: DB_HOST
   VALUE: aws.connect.psdb.cloud
   
   KEY: DB_USER
   VALUE: user123 (your PlanetScale username)
   
   KEY: DB_PASSWORD
   VALUE: password456 (your PlanetScale password)
   
   KEY: DB_NAME
   VALUE: revoz_ultra_max
   
   KEY: SESSION_SECRET
   VALUE: your_very_secure_random_string_here_min_32_chars
   
   KEY: NODE_ENV
   VALUE: production

7. Click "Create Web Service"

8. Render will start deploying:
   - Wait for build logs to complete
   - Usually takes 3-5 minutes
   - Look for: "Server is running on port..."

9. Once deployed, you'll get a URL like:
   https://revoz-ultra-pro-max.onrender.com

---

STEP 6: Test Your Live App
==========================

1. Open your Render app URL in browser
2. Test login/register functionality
3. Test database queries (categories, products)
4. Check browser console and Render logs for errors

---

TROUBLESHOOTING
===============

Issue: "Cannot connect to database"
- Check environment variables are correct in Render dashboard
- Verify PlanetScale credentials are copy-pasted exactly (including password)
- Make sure schema.sql was imported successfully to PlanetScale

Issue: "Application crashes on startup"
- Check Render deployment logs: Dashboard → Web Service → Logs
- Look for error messages
- Common issues: PORT env var, missing npm packages, syntax errors

Issue: "App goes to sleep and response is slow"
- This is normal on Free tier (auto-sleep after 15 min idle)
- Solution: Use uptimerobot.com to ping your app every 5 minutes
- Or upgrade to paid plan

Issue: "File uploads don't persist"
- Render uses ephemeral file system (files deleted on redeploy)
- Solution: Use Cloudinary or AWS S3 for file storage instead of local uploads/

Issue: "Database queries timeout"
- PlanetScale has connection limits on free tier
- Solution: Implement connection pooling in db.js
- Or upgrade to PlanetScale paid plan

---

NEXT STEPS / OPTIMIZATION
=========================

1. **Monitor Your App**
   - Set up Render alerts (Settings → Notifications)
   - Use uptimerobot.com to monitor uptime and avoid auto-sleep

2. **Keep Logs Clean**
   - Use Winston or Morgan for logging to file
   - Remove console.log statements in production

3. **Backup Your Database**
   - PlanetScale auto-backups (on paid plans)
   - Manually export: pscale db shell revoz_ultra_max -- mysqldump > backup.sql

4. **Scale When Needed**
   - If you get more users, upgrade PlanetScale plan (scales database)
   - Upgrade Render plan (for faster response, no sleep)

5. **Custom Domain**
   - Render → Web Service → Settings → Custom Domain
   - Point your domain DNS to Render

6. **SSL/HTTPS**
   - Render automatically provides SSL
   - App is already HTTPS

---

DEPLOY UPDATES (After Initial Deployment)
==========================================

Every time you update your code and want to redeploy:

1. Commit changes locally:
   git add .
   git commit -m "Description of changes"
   git push origin main

2. Render will automatically detect the push and redeploy
   - Watch deployment logs in Render dashboard
   - Usually takes 1-2 minutes

3. Your live app updates automatically!

---

That's it! Your app is now live on the internet, accessible 24/7 on Render + PlanetScale (free tier).

Questions? Check:
- Render docs: https://render.com/docs
- PlanetScale docs: https://planetscale.com/docs
