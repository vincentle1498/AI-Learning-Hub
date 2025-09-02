# 🚀 Quick Deploy Guide - Steps 4 & 5

## Step 4: Update Frontend Files

### 4.1 - Update Your Render URL
After deploying to Render (Step 3), you'll get a URL like: `https://ai-learning-hub-xxx.onrender.com`

1. Open `index.html` in any text editor
2. Find line 6730 (near the bottom)
3. Replace `'https://your-backend-url.onrender.com/api'` with your actual Render URL
   
   Example:
   ```javascript
   const API_URL = 'https://ai-learning-hub-backend.onrender.com/api';
   ```

### 4.2 - Add Files to Your GitHub Repository

You need to upload these files to GitHub:
- `index.html` (updated version)
- `api-integration.js` (new file)
- `backend/` folder (all backend files)

#### Method 1: Using GitHub Website (Easiest)

1. Go to your repository: https://github.com/vincentle1498/AI-Learning-Hub
2. Click "Add file" → "Upload files"
3. Drag and drop these files:
   - Your updated `index.html`
   - The new `api-integration.js`
4. Click "Commit changes"

5. For the backend folder:
   - Click "Create new file"
   - Type: `backend/package.json`
   - Copy/paste the package.json content
   - Click "Commit new file"
   - Repeat for `backend/server.js` and `backend/.env.example`

#### Method 2: Using Git Command Line

If you have Git installed:

```bash
# Navigate to your project folder
cd "C:\AI Website"

# Initialize git if not already done
git init

# Add remote repository
git remote add origin https://github.com/vincentle1498/AI-Learning-Hub.git

# Add all files
git add .

# Commit changes
git commit -m "Add backend and API integration"

# Push to GitHub
git push origin main
```

## Step 5: Netlify Auto-Deploy

### 5.1 - Check Auto-Deploy Status

Netlify should automatically detect your GitHub changes and redeploy.

1. Go to: https://app.netlify.com
2. Click on your site (ai-learning-hub)
3. Look for "Production deploys" - you should see a new deploy in progress

### 5.2 - If Auto-Deploy Isn't Working

#### Option A: Manual Deploy
1. In Netlify dashboard, click "Deploys" tab
2. Click "Trigger deploy" → "Deploy site"

#### Option B: Drag & Drop Deploy
1. On your computer, create a folder with just:
   - `index.html`
   - `api-integration.js`
2. Go to https://app.netlify.com/drop
3. Drag the folder onto the page

#### Option C: Link GitHub to Netlify
1. In Netlify, go to "Site settings"
2. Click "Build & deploy" → "Continuous deployment"
3. Click "Link site to Git"
4. Choose GitHub
5. Select your repository
6. Deploy settings:
   - Branch: main
   - Build command: (leave empty)
   - Publish directory: (leave empty or .)

## 🎯 Quick Checklist

- [ ] Render backend is deployed and running
- [ ] You have your Render URL (like: https://xxx.onrender.com)
- [ ] Updated API_URL in index.html with your Render URL
- [ ] Uploaded index.html to GitHub
- [ ] Uploaded api-integration.js to GitHub
- [ ] Uploaded backend files to GitHub
- [ ] Netlify shows "Published" for latest deploy

## 🧪 Test Your Connection

1. Open your site: https://ailearninghubs.netlify.app
2. Open browser console (F12)
3. Look for any red errors
4. Try creating a project
5. Refresh the page - data should persist

## 🔧 Troubleshooting

**"API Error" in console:**
- Your Render backend might be sleeping (takes 30 sec to wake up)
- Try again after 30 seconds

**"CORS error" in console:**
- Make sure your backend server.js has `app.use(cors())` (it does)
- Check that Render is running

**Changes not showing:**
- Clear browser cache (Ctrl+Shift+R)
- Check Netlify deploy status
- Wait 2-3 minutes for deploy to complete

## 📝 Final Notes

Your app now works in "hybrid mode":
- **If backend is available**: Uses real database
- **If backend is down**: Falls back to localStorage
- **Best of both worlds**: Always works, even offline!

Need help? The backend will wake up after first request (free tier limitation).