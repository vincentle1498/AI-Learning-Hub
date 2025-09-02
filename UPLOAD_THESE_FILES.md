# 📁 FILES TO UPLOAD TO GITHUB

## ✅ Upload These Files to the ROOT of your GitHub Repository

Upload ALL these files directly to the main/root folder of your GitHub repo (NOT in any subfolder):

### Backend Files (3 files):
1. ✅ **package.json** - Node.js dependencies
2. ✅ **server.js** - Your backend server
3. ✅ **.env.example** - Environment template

### Frontend Files (2 files):
4. ✅ **index.html** - Your main website (updated with API)
5. ✅ **api-integration.js** - API connection code

## 📤 How to Upload to GitHub

### Method 1: GitHub Website (Easiest)
1. Go to: https://github.com/vincentle1498/AI-Learning-Hub
2. Click the **"Add file"** button → **"Upload files"**
3. Open your folder: `C:\AI Website\`
4. Select and drag these 5 files:
   - package.json
   - server.js
   - .env.example
   - index.html
   - api-integration.js
5. Scroll down and click **"Commit changes"**

### Method 2: Create Files Manually on GitHub
1. Go to: https://github.com/vincentle1498/AI-Learning-Hub
2. Click **"Create new file"**
3. Name it: `package.json`
4. Copy content from your local file
5. Click **"Commit new file"**
6. Repeat for all 5 files

## 🔧 After Uploading - Fix Render

1. Go to your Render dashboard
2. Click on your service
3. Go to **Settings** tab
4. Find **"Root Directory"**
5. Make it **EMPTY** (delete any text there)
6. Click **Save Changes**

## ✅ Your Repository Structure Should Look Like:

```
AI-Learning-Hub/
├── package.json          ← Backend config
├── server.js            ← Backend server
├── .env.example         ← Environment template
├── index.html           ← Frontend website
├── api-integration.js   ← API connector
└── README.md           ← (optional)
```

## 🚨 IMPORTANT NOTES:

- Do NOT create any folders
- Upload all files to the ROOT directory
- Make sure Render's "Root Directory" is EMPTY
- The backend folder is NOT needed anymore

## 🎯 Final Checklist:

- [ ] All 5 files uploaded to GitHub root
- [ ] Render "Root Directory" is empty
- [ ] Render shows "Deploy in progress" or "Live"
- [ ] Visit your site after 2-3 minutes

That's it! Your app will be live with a real backend!