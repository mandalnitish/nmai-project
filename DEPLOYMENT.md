# NMAI Current Affairs - Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Vercel/Netlify account (for frontend)
- Render/Railway account (for backend)

## 📦 Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Visit https://www.mongodb.com/cloud/atlas/register
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE M0 tier
   - Select region closest to your users
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `nmai_admin`
   - Password: Generate secure password
   - Select "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://nmai_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add database name: `nmai-current-affairs`
   ```
   mongodb+srv://nmai_admin:yourpassword@cluster0.xxxxx.mongodb.net/nmai-current-affairs?retryWrites=true&w=majority
   ```

## 🔧 Step 2: Backend Deployment (Render)

### Option A: Deploy to Render (Recommended)

1. **Push Code to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Render Account**
   - Visit https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` directory

4. **Configure Service**
   - Name: `nmai-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ADMIN_EMAIL=admin@nmai.in
   ADMIN_PASSWORD=ChangeThisSecurePassword123!
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://nmai-backend.onrender.com`

### Option B: Deploy to Railway

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables** (same as Render)

4. **Deploy**
   - Railway automatically deploys
   - Note your backend URL

## 🌐 Step 3: Frontend Deployment (Vercel)

### Option A: Deploy to Vercel (Recommended)

1. **Update Frontend Environment**
   Create `.env` file in frontend directory:
   ```env
   REACT_APP_API_URL=https://nmai-backend.onrender.com/api
   ```

2. **Push Frontend to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git push
   ```

3. **Create Vercel Account**
   - Visit https://vercel.com/signup
   - Sign up with GitHub

4. **Import Project**
   - Click "Add New" → "Project"
   - Import your frontend repository

5. **Configure Project**
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

6. **Add Environment Variable**
   ```
   REACT_APP_API_URL=https://nmai-backend.onrender.com/api
   ```

7. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live: `https://nmai.vercel.app`

### Option B: Deploy to Netlify

1. **Create Netlify Account**
   - Visit https://www.netlify.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select repository

3. **Configure Build**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

4. **Add Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add: `REACT_APP_API_URL`

5. **Deploy**
   - Click "Deploy site"

## 🔐 Step 4: Security Configuration

### Update Backend CORS

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://nmai.vercel.app', // Your actual frontend URL
  credentials: true
}));
```

Redeploy backend after this change.

### Update Frontend API URL

Ensure `.env` in frontend has correct backend URL:
```env
REACT_APP_API_URL=https://nmai-backend.onrender.com/api
```

## 📧 Step 5: Email Configuration (Optional)

For password reset emails, configure nodemailer:

### Using Gmail

1. **Enable 2-Factor Authentication** on Gmail

2. **Create App Password**
   - Google Account → Security → 2-Step Verification
   - App passwords → Select "Mail" and "Other"
   - Copy generated password

3. **Add to Backend Environment Variables**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=NMAI Current Affairs <noreply@nmai.in>
   ```

## 🎨 Step 6: Custom Domain (Optional)

### For Vercel (Frontend)

1. Go to your project → Settings → Domains
2. Add your custom domain: `nmai.in`
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### For Render (Backend)

1. Go to your service → Settings → Custom Domains
2. Add: `api.nmai.in`
3. Configure DNS:
   ```
   Type: CNAME
   Name: api
   Value: your-app.onrender.com
   ```

## 💰 Step 7: Google AdSense Setup

1. **Apply for AdSense**
   - Visit https://www.google.com/adsense
   - Sign up and add your domain
   - Wait for approval (1-2 weeks)

2. **Add AdSense Code**
   Edit `frontend/public/index.html`:
   ```html
   <head>
     <!-- Other head content -->
     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-ID"
          crossorigin="anonymous"></script>
   </head>
   ```

3. **Create Ad Units**
   - In AdSense dashboard, create ad units
   - Add ad code to your components

## 📊 Step 8: Analytics Setup

### Google Analytics

1. **Create GA4 Property**
   - Visit https://analytics.google.com
   - Create new property
   - Get Measurement ID: `G-XXXXXXXXXX`

2. **Add to Frontend**
   Edit `frontend/public/index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 🔧 Step 9: Seed Database

1. **SSH into Render/Railway** (if available) or use MongoDB Atlas UI

2. **Run Seed Script**
   ```bash
   npm run seed
   ```

3. **Or Manually Create Admin**
   Use MongoDB Compass or Atlas UI to create admin user

## ✅ Step 10: Verification Checklist

- [ ] Backend is live and accessible
- [ ] Frontend is live and loads correctly
- [ ] Can register new user
- [ ] Can login
- [ ] Articles display correctly
- [ ] MCQs work properly
- [ ] Admin panel accessible
- [ ] Database connected
- [ ] Email sending works (if configured)
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] HTTPS enabled (automatic on Vercel/Render)

## 🐛 Troubleshooting

### Backend Not Connecting to MongoDB
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Check environment variables in Render/Railway

### CORS Errors
- Update FRONTEND_URL in backend environment
- Update CORS origin in server.js
- Redeploy backend

### Frontend 404 on Refresh
For Vercel, create `frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### API Calls Failing
- Check REACT_APP_API_URL in frontend
- Verify backend is running
- Check browser console for errors

## 📱 Mobile App (Future)

Convert to React Native:
1. Create new React Native project
2. Reuse API service (`services/api.js`)
3. Rebuild UI with React Native components
4. Deploy to Play Store / App Store

## 💡 Post-Deployment

### Monitor Performance
- Use Render/Railway logs
- Set up error tracking (Sentry)
- Monitor MongoDB Atlas metrics

### Regular Maintenance
- Update dependencies monthly
- Backup database weekly
- Monitor server costs

### Scale as Needed
- Upgrade Render/Railway plan for more traffic
- Scale MongoDB Atlas cluster
- Add CDN (Cloudflare) for static assets

## 🎉 You're Live!

Your NMAI Current Affairs website is now live! Share your URL:
- Website: `https://nmai.vercel.app` or your custom domain
- API: `https://nmai-backend.onrender.com`

---

## 📞 Need Help?

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB connection
5. Review CORS settings

For support: support@nmai.in