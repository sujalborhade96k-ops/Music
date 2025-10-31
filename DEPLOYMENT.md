# 🚀 TuneStream - Complete Deployment Guide

Deploy TuneStream in 10 minutes using Netlify (frontend) + Railway (backend).

## Prerequisites

- GitHub account (free)
- Netlify account (free): https://netlify.com
- Railway account (free): https://railway.app
- YouTube API key (see step 1 below)

---

## Step 1: Get YouTube API Key

**Time: 5 minutes**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click the project dropdown (top-left)
   - Click "NEW PROJECT"
   - Name it "TuneStream"
   - Click "CREATE"

3. Enable YouTube Data API v3:
   - Search for "YouTube Data API v3"
   - Click on it → Click "ENABLE"
   - Wait for it to enable

4. Create API credentials:
   - Click "Create Credentials" → "API Key"
   - Copy your API key (keep it secret!)
   - You'll use this in deployment steps below

---

## Step 2: Push Code to GitHub

**Time: 2 minutes**

1. If you haven't already, initialize a git repository:
   ```bash
   cd /workspace/cmhexhwfr00q4r3ilm6chn3j6/Music
   git add .
   git commit -m "Initial TuneStream commit"
   ```

2. Create a new GitHub repository:
   - Go to https://github.com/new
   - Name it `tunestream` (or any name)
   - Click "Create repository"

3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tunestream.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 3: Deploy Backend to Railway

**Time: 3 minutes**

1. Go to https://railway.app and sign up (with GitHub)

2. Click "New Project" → "Deploy from GitHub"

3. Select your `tunestream` repository

4. Railway will auto-detect it's a Node.js project

5. **Important**: Set environment variables:
   - Click on your project
   - Go to "Variables"
   - Add:
     - Key: `YOUTUBE_API_KEY`
     - Value: (paste your YouTube API key from Step 1)
     - Key: `NODE_ENV`
     - Value: `production`

6. Wait for deployment to complete (2-3 minutes)

7. **Get your backend URL**:
   - In Railway dashboard, click your project
   - Look for "Public URL" or similar
   - Copy it (should look like `https://tunestream-prod.up.railway.app`)
   - **SAVE THIS URL** - you'll need it for the frontend

---

## Step 4: Deploy Frontend to Netlify

**Time: 2 minutes**

1. Go to https://netlify.com and sign up (with GitHub)

2. Click "Add new site" → "Import an existing project"

3. Click "GitHub" and authorize

4. Select your `tunestream` repository

5. **Configure build settings**:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/.next`
   - Base directory: (leave empty)

6. Click "Deploy"

7. Wait for build to complete (3-5 minutes)

8. **Set environment variable**:
   - In Netlify dashboard, go to Site settings → Build & Deploy → Environment
   - Click "Edit variables"
   - Add:
     - Key: `NEXT_PUBLIC_BACKEND_URL`
     - Value: (paste your Railway backend URL from Step 3)

9. **Trigger redeploy**:
   - Go to "Deploys"
   - Click "Trigger deploy" → "Deploy site"

10. **Get your frontend URL**:
    - It will be something like `https://tunestream-abc123.netlify.app`
    - This is your live app!

---

## Step 5: Test Your Live App

1. Open your Netlify URL in a browser
2. Search for a song (e.g., "Taylor Swift")
3. Click a result to add to queue
4. Use player controls to play/pause/next
5. Toggle dark mode
6. Try recent searches

---

## Troubleshooting

### Search doesn't work (404 error)
- Check that `NEXT_PUBLIC_BACKEND_URL` in Netlify is set correctly
- Trigger a new deploy in Netlify after setting the variable
- Check Railway logs to see if backend is running

### "Queue is Empty" message after clicking search result
- Check browser console (F12) for errors
- Verify backend URL is accessible: Visit `https://your-railway-url/health`
- Should return `{"status":"ok"}`

### YouTube player doesn't load
- Check that video IDs are valid (first search result should load)
- Open browser console to check for errors
- Try searching for a different song

### API quota exceeded error
- You've exceeded free YouTube API tier (100 queries/day)
- Wait 24 hours or upgrade your quota in Google Cloud Console

---

## Next Steps (Optional)

### Custom Domain
- Netlify: Go to Site settings → Domain management → Add domain
- Railway: Doesn't require custom domain (API works fine)

### Environment-specific builds
- Update `frontend/package.json`:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
  ```

### Monitor your app
- **Netlify**: Analytics dashboard shows page views, bandwidth
- **Railway**: View logs in project dashboard

---

## Costs

- **Netlify**: Free tier (fully sufficient)
  - 300 minutes build time/month
  - Unlimited bandwidth
  - Perfect for this app

- **Railway**: Free tier
  - $5 credit/month (usually free)
  - Perfect for low-traffic API

---

## Your Live App URLs

After deployment:
- **Frontend**: `https://tunestream-XXXX.netlify.app`
- **Backend API**: `https://tunestream-prod.up.railway.app/api/search?q=test`

Share the frontend URL with anyone - it's your fully functioning music player!

---

## Quick Checklist

- [ ] Got YouTube API key
- [ ] Pushed code to GitHub
- [ ] Deployed backend to Railway
- [ ] Set YouTube API key in Railway
- [ ] Deployed frontend to Netlify
- [ ] Set `NEXT_PUBLIC_BACKEND_URL` in Netlify
- [ ] Triggered redeploy in Netlify
- [ ] Tested live app (search works)
- [ ] All features working ✅

---

**Total deployment time: ~15 minutes**

**You now have a fully deployed, production-ready music player!** 🎵
