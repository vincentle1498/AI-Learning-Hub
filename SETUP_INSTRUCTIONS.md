# 🚀 Setup Instructions - Connect Frontend to Backend

## Step 1: Set Up MongoDB (Free Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier)
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## Step 2: Push Backend to GitHub

1. Copy the `backend` folder to your GitHub repository
2. In your GitHub repo, create these files:
   - `package.json`
   - `server.js`
   - `.env.example`

3. Commit and push:
```bash
git add .
git commit -m "Add backend server"
git push
```

## Step 3: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: ai-learning-hub-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables in Render:
   - Click "Environment" tab
   - Add: `MONGODB_URI` = your MongoDB connection string
   - Add: `PORT` = 5000

6. Click "Create Web Service"
7. Wait for deployment (takes 2-3 minutes)
8. Copy your Render URL (looks like: `https://ai-learning-hub-backend.onrender.com`)

## Step 4: Update Frontend

1. In your `index.html` file, add before the closing `</body>` tag:
```html
<script>
  // Add your Render backend URL here
  const API_URL = 'https://your-backend-url.onrender.com/api';
</script>
<script src="api-integration.js"></script>
```

2. Update the `api-integration.js` file:
   - Replace `'https://your-render-url.onrender.com/api'` with your actual Render URL

3. Push to GitHub:
```bash
git add .
git commit -m "Add API integration"
git push
```

## Step 5: Redeploy on Netlify

Your Netlify site will automatically update when you push to GitHub.

If not:
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click your site
3. Click "Deploys" → "Trigger deploy"

## Step 6: Test Everything

1. Open your site: https://ailearninghubs.netlify.app
2. Open browser console (F12)
3. Try creating a project
4. Check if data persists after refresh

## 🎉 You're Done!

Your app now has:
- ✅ Real database (MongoDB)
- ✅ Backend API (Express on Render)
- ✅ Frontend connected to backend
- ✅ Data persistence across sessions
- ✅ Fallback to localStorage if API fails

## Troubleshooting

**If API calls fail:**
- Check Render logs for errors
- Verify MongoDB connection string
- Check browser console for CORS errors
- Make sure Render URL is correct in api-integration.js

**Free Tier Limitations:**
- Render: Spins down after 15 min inactivity (first request takes 30 sec)
- MongoDB Atlas: 512MB storage limit
- Netlify: 100GB bandwidth/month

## Optional Enhancements

To add API key protection:
1. Generate a random API key
2. Add to Render environment: `API_KEY=your-secret-key`
3. Update backend to check for API key in headers
4. Update frontend to send API key with requests