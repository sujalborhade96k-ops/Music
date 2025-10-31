# 🎵 TuneStream - Netlify Deployment (QUICK START)

## 📥 What You Have

You've downloaded **TuneStream.tar.gz** - a complete, production-ready YouTube Music player.

## 🚀 Deploy in 15 Minutes

### Step 1: Extract the Archive
```bash
tar -xzf TuneStream.tar.gz
cd Music
```

### Step 2: Get Your YouTube API Key (5 min)

1. Go to: https://console.cloud.google.com/
2. Create new project: "TuneStream"
3. Search for "YouTube Data API v3" → Click it → "ENABLE"
4. Click "Create Credentials" → "API Key"
5. **Copy your API key** (keep it secret)

### Step 3: Push to GitHub (2 min)

1. Go to: https://github.com/new
2. Create repo named `tunestream`
3. Run these commands in your Music folder:
   ```bash
   git add .
   git commit -m "Initial TuneStream commit"
   git remote add origin https://github.com/YOUR_USERNAME/tunestream.git
   git branch -M main
   git push -u origin main
   ```

### Step 4: Deploy Backend to Railway (3 min)

1. Go to: https://railway.app (sign up with GitHub)
2. Click "New Project" → "Deploy from GitHub"
3. Select your `tunestream` repo
4. Set environment variables:
   - `YOUTUBE_API_KEY` = (paste your key from Step 2)
   - `NODE_ENV` = `production`
5. Wait for deployment (2-3 min)
6. **Copy your Railway URL** (you'll see it in the dashboard)

### Step 5: Deploy Frontend to Netlify (3 min)

1. Go to: https://netlify.com (sign up with GitHub)
2. Click "Add new site" → "Import an existing project"
3. Select `tunestream` repo
4. Set these values:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/.next`
5. Click "Deploy site"
6. Wait for build (3-5 min)

### Step 6: Connect Backend to Frontend (2 min)

1. In Netlify, go to Site settings → Build & Deploy → Environment
2. Add new variable:
   - Key: `NEXT_PUBLIC_BACKEND_URL`
   - Value: (paste your Railway URL from Step 4)
3. Click "Trigger deploy" in Deploys tab
4. Wait for redeploy (2-3 min)

### Step 7: Test Your App ✅

- Go to your Netlify URL (looks like: `https://tunestream-abc123.netlify.app`)
- Search for a song
- Click result → Queue
- Player page opens
- Use controls: Play/Pause/Next/Previous
- Toggle dark mode
- Done! 🎉

---

## 🎯 Your Live URLs

After deployment:
- **Frontend** (share this): `https://tunestream-XXXXX.netlify.app`
- **Backend API**: `https://yourdomain.up.railway.app` (internal use)

---

## 📖 Full Documentation

- `README.md` - Features & tech stack
- `DEPLOYMENT.md` - Detailed deployment guide
- `frontend/` - React/Next.js frontend code
- `backend/` - Node.js/Express API code

---

## ⚡ Troubleshooting

**Search doesn't work?**
- Check `NEXT_PUBLIC_BACKEND_URL` is set in Netlify
- Make sure you triggered a redeploy after setting it
- Visit your Railway URL + `/health` to test backend

**Player won't load?**
- Try searching again
- Check browser console (F12) for errors
- Try a different song

**"API quota exceeded"?**
- Free YouTube API = 100 queries/day
- Wait 24 hours or upgrade quota in Google Cloud

---

## 💰 Costs

- **Netlify**: FREE (perfect for this app)
- **Railway**: FREE ($5 credit/month is enough)
- **YouTube API**: FREE (for development)

**Total cost: $0** ✅

---

## 🎵 You're Done!

You now have a fully deployed music player running in the cloud!

Share your Netlify URL with friends - they can use it immediately.

Enjoy! 🎉
